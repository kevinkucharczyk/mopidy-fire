import config from '../config/environment';
import Ember from 'ember';

const Timer = Ember.Object.extend({
  interval: 1000,
  timestamp: 0,
  callback: null,

  schedule: function(f) {
    return Ember.run.later(this, function() {
      let currentTimestamp = this.get('timestamp');
      let newTimestamp = Date.now();
      let timeDiff = newTimestamp - currentTimestamp;
      this.set('timestamp', newTimestamp);
      f.apply(this, [timeDiff]);
      this.set('timer', this.schedule(f));
    }, this.get('interval'));
  },

  stop: function() {
    Ember.run.cancel(this.get('timer'));
  },

  start: function() {
    let timestamp = Date.now();
    this.set('timestamp', timestamp);
    this.set('timer', this.schedule(this.get('callback')));
  }
});

export default Ember.Service.extend({
  currentTrack: null,
  currentVolume: 0,
  isMute: false,
  isPlaying: false,
  currentPosition: 0,

  progressTracker: null,

  loaderService: Ember.inject.service('loader-service'),

  init() {
    this._super.apply(this, arguments);
    this._connect();

    const service = this;
    let progressTracker = Timer.create({
      callback(difference) {
        let currentPosition = service.get('currentPosition');
        let newPosition = currentPosition + difference;
        service.set('currentPosition', newPosition);
      }
    });

    this.set('progressTracker', progressTracker);
  },

	_connect() {
		const options = {
			callingConvention: 'by-position-or-by-name',
			webSocketUrl: 'ws://' + config.mopidyURL + ':' + config.mopidyPort + '/mopidy/ws'
		};
		const mopidy = new Mopidy(options);
		const mopidyCaller = new Ember.RSVP.Promise((resolve) => {
      mopidy.on((event) => {
        if (event === "state:online") {
          window.mopidy = mopidy; // attach mopidy to window for debugging purposes
          this._initPlayer();
          this._initListeners();
          resolve(mopidy);
        }
      });
    });

		this.set('mopidy', mopidy);
    this.set('mopidyCaller', mopidyCaller);
	},

  _initPlayer() {
    this._call('playback', 'getCurrentTrack').then((data) => {
      this.set('currentTrack', data);
    });

    this._call('playback', 'getTimePosition').then((data) => {
      this.set('currentPosition', data);
    });

    this._call('playback', 'getState').then((data) => {
      if(data === 'playing') {
        this.set('isPlaying', true);
        this.get('progressTracker').start();
      }
    });

    this.getVolume().then((volume) => {
      this.set('currentVolume', volume);
    });

    this.getMute().then((state) => {
      this.set('isMute', state);
    });
  },

  _initListeners() {
    let mopidy = this.get('mopidy');

    mopidy.on('event:trackPlaybackStarted', (data) => {
      let track = data.tl_track.track;
      this.set('currentTrack', track);
      this.set('isPlaying', true);
      this.set('currentPosition', 0);
      this.get('progressTracker').start();
    });

    mopidy.on('event:trackPlaybackResumed', (data) => {
      let track = data.tl_track.track;
      let timePosition = data.time_position;
      this.set('currentTrack', track);
      this.set('isPlaying', true);
      this.set('currentPosition', timePosition);
      this.get('progressTracker').start();
    });

    mopidy.on('event:trackPlaybackPaused', () => {
      this.set('isPlaying', false);
      this.get('progressTracker').stop();
    });

    mopidy.on('event:trackPlaybackEnded', (data) => {
      let timePosition = data.time_position;
      this.set('isPlaying', false);
      this.set('currentPosition', timePosition);
      this.get('progressTracker').stop();
    });

    mopidy.on('event:seeked', (data) => {
      let timePosition = data.time_position;
      this.set('currentPosition', timePosition);
    });

    mopidy.on('event:volumeChanged', (data) => {
      let volume = data.volume;
      this.set('currentVolume', volume);
    });

    mopidy.on('event:muteChanged', (state) => {
      let muteState = state.mute;
      this.set('isMute', muteState);
    });
  },

	_call(ns, func, args = undefined) {
    this.get('loaderService').show();
		return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('mopidyCaller').then((mopidy) => {
        const mopidyFunction = mopidy[ns][func];

        (args === undefined ? mopidyFunction() : mopidyFunction(args)).then((result) => {
          this.get('loaderService').hide();
          resolve(result);
        }, (reason) => {
          this.get('loaderService').hide();
          reject(reason);
        });
      });
    });
	},

  playTrack(uri) {
    return this.clearTracklist().then(() => {
      return this.addTrack(uri).then(() => {
        return this.play();
      });
    });
  },

  addTrack(uri) {
    return this._call('tracklist', 'add', { uris: [uri] });
  },

  clearTracklist() {
    return this._call('tracklist', 'clear');
  },

  play() {
    return this._call('playback', 'play');
  },

  pause() {
    return this._call('playback', 'pause');
  },

  stop() {
    return this._call('playback', 'stop');
  },

  togglePlayPause() {
    let isPlaying = this.get('isPlaying');
    if(isPlaying) {
      return this.pause();
    } else {
      return this.play();
    }
  },

  seek(position) {
    return this._call('playback', 'seek', { time_position: position });
  },

  getPlaylists() {
    return this._call('playlists', 'getPlaylists');
  },

  getPlaylist(uri) {
    return this._call('playlists', 'lookup', { uri: uri });
  },

  getImages(uris) {
    return this._call('library', 'getImages', { uris: uris });
  },

  getVolume() {
    return this._call('mixer', 'getVolume');
  },

  setVolume(volume) {
    return this._call('mixer', 'setVolume', { volume: volume });
  },

  getMute() {
    return this._call('mixer', 'getMute');
  },

  setMute(state) {
    return this._call('mixer', 'setMute', { mute: state });
  },

  toggleMute() {
    let muteState = this.get('isMute');
    return this.setMute(!muteState);
  }
});
