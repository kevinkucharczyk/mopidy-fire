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
  tracklist: null,
  isRandom: false,
  isRepeat: false,
  isConnected: false,

  progressTracker: null,

  loaderService: Ember.inject.service('loader-service'),
  localStorage: Ember.inject.service('local-storage'),

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

  _getMopidyUrl() {
    const settings = this.get('localStorage').getItem('settings');
    if(settings === undefined ||
    settings === null ||
    settings === {} ||
    settings['url'] === undefined ||
    settings['url'] === null) {
      return 'localhost:6680';
    } else {
      return settings['url'];
    }
  },

  open() {
    this._connect();
  },

  close() {
    this._disconnect();
  },

  reopen() {
    this._reopen();
  },

	_connect() {
    const mopidyUrl = this._getMopidyUrl();
		const options = {
      autoConnect: false,
			callingConvention: 'by-position-or-by-name',
      webSocketUrl: 'ws://' + mopidyUrl + '/mopidy/ws'
		};
    const mopidy = new Mopidy(options);

    mopidy.connect();
    const mopidyCaller = new Ember.RSVP.Promise((resolve, reject) => {
      mopidy.on((event, err) => {
        if (event === "state:online") {
          window.mopidy = mopidy; // attach mopidy to window for debugging purposes
          this._initPlayer();
          this._initListeners();
          this.set('isConnected', true);
          resolve(mopidy);
        }
        if (event === 'websocket:error') {
          this.get('loaderService').hide();
          this._disconnect();
          this.set('isConnected', false);
          reject({
            event: err,
            name: 'ConnectionError',
            message: 'Could not connect to Mopidy'
          });
        }
      });
    });

    this.set('mopidy', mopidy);
    this.set('mopidyCaller', mopidyCaller);
	},

  _disconnect() {
    let mopidy = this.get('mopidy');

    mopidy.close();
    mopidy.off();
  },

  _reopen() {
    this._disconnect();
    this._connect();
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

    this.getTracklist().then((data) => {
      this.set('tracklist', data);
    });

    this.getVolume().then((volume) => {
      this.set('currentVolume', volume);
    });

    this.getMute().then((state) => {
      this.set('isMute', state);
    });

    this._updateOptions();
  },

  _updateOptions() {
    this.getRandom().then((state) => {
      this.set('isRandom', state);
    });

    this.getRepeat().then((state) => {
      this.set('isRepeat', state);
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

    mopidy.on('event:trackPlaybackPaused', (data) => {
      let track = data.tl_track.track;
      let timePosition = data.time_position;
      this.set('currentTrack', track);
      this.set('isPlaying', false);
      this.set('currentPosition', timePosition);
      this.get('progressTracker').stop();
    });

    mopidy.on('event:trackPlaybackEnded', (data) => {
      let timePosition = data.time_position;
      this.set('isPlaying', false);
      this.set('currentPosition', timePosition);
      this.get('progressTracker').stop();
    });

    mopidy.on('event:tracklistChanged', () => {
      this.getTracklist().then((data) => {
        this.set('tracklist', data);
      });
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

    mopidy.on('event:optionsChanged', () => {
      this._updateOptions();
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
        }).catch((reason) => {
          reject(reason);
      });
      }).catch((reason) => {
        reject(reason);
      });
    });
	},

  clearAndPlaySingle(uri) {
    return this.clearTracklist().then(() => {
      return this.addTrack(uri).then(() => {
        return this.play();
      });
    });
  },

  playTrack(tlid) {
    return this._call('playback', 'play', { tlid: tlid });
  },

  addTrack(uri) {
    return this.addTracks([uri]);
  },

  addTracks(uris) {
    return this._call('tracklist', 'add', { uris: uris });
  },

  removeTrack(uri) {
    return this.removeTracks([uri]);
  },

  removeTracks(uris) {
    return this._call('tracklist', 'remove', { uri: uris });
  },

  getTracklist() {
    return this._call('tracklist', 'getTlTracks');
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

  previous() {
    return this._call('playback', 'previous');
  },

  next() {
    return this._call('playback', 'next');
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

  getRandom() {
    return this._call('tracklist', 'getRandom');
  },

  getRepeat() {
    return this._call('tracklist', 'getRepeat');
  },

  setRandom(value) {
    return this._call('tracklist', 'setRandom', { value: value });
  },

  setRepeat(value) {
    return this._call('tracklist', 'setRepeat', { value: value });
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
