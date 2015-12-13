import config from '../config/environment';
import Ember from 'ember';

export default Ember.Service.extend({
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
		const mopidyCaller = new Ember.RSVP.Promise(function (resolve) {
      mopidy.on(function (event) {
        if (event === "state:online") {
          window.mopidy = mopidy;
          resolve(mopidy);
        }
      });
    });
    
		this.set('mopidy', mopidy);
    this.set('mopidyCaller', mopidyCaller);
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
