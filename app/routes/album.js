import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('mopidy').getAlbum(params.uri);
  },

  _playAlbum() {
    let uri = this.get('controller.model.album.uri');
    this.get('mopidy').clearAndPlaySingle(uri);
  },

  _addAlbum() {
    let uri = this.get('controller.model.album.uri');
    this.get('mopidy').addTrack(uri);
  },

  actions: {
    play() {
      this._playAlbum();
    },

    add() {
      this._addAlbum();
    }
  }
});
