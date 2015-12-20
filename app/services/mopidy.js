import config from '../config/environment';
import Ember from 'ember';

export default Ember.Service.extend({
  currentTrack: null,

  init() {
    this._super.apply(this, arguments);
    this._connect();
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
  },

  _initListeners() {
    let mopidy = this.get('mopidy');

    mopidy.on('event:trackPlaybackStarted', (data) => {
      let track = data.tl_track.track;
      this.set('currentTrack', track);
    });

    mopidy.on('event:trackPlaybackResumed', (data) => {
      let track = data.tl_track.track;
      this.set('currentTrack', track);
    });
  },

	_call(ns, func, args = undefined) {
		return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('mopidyCaller').then((mopidy) => {
        const mopidyFunction = mopidy[ns][func];

        (args === undefined ? mopidyFunction() : mopidyFunction(args)).then(function(result) {
          resolve(result);
        }, function (reason) {
          reject(reason);
        });
      });
    });
	},

  playTrack(track) {
    return this.clearTracklist().then(() => {
      return this.add(track).then(() => {
        return this.play();
      });
    });
  },

  add(track) {
    return this._call('tracklist', 'add', { uris: [track] });
  },

  clearTracklist() {
    return this._call('tracklist', 'clear');
  },

  play() {
    return this._call('playback', 'play');
  },

  stop() {
    return this._call('playback', 'stop');
  },

  getPlaylists() {
    return this._call('playlists', 'getPlaylists');
  },

  getPlaylist(uri) {
    return this._call('playlists', 'lookup', { uri: uri });
  },

  getImages(uris) {
    return this._call('library', 'getImages', { uris: uris });
  }
});
