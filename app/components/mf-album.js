import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['album'],
  classNameBindings: ['listView:album--list-item'],
  listView: false,

  backgroundImage: Ember.computed('images', function() {
    var bg = this.get('images.2.uri');
    return Ember.String.htmlSafe('background-image: ' + bg);
  }),

  didReceiveAttrs() {
    let album = this.get('album');

    this.get('mopidy').getImages([album.uri]).then((response) => {
      let images = response[album.uri];
      this.set('images', images);
    });
  },

  _playAlbum() {
    let uri = this.get('album.uri');
    this.get('mopidy').clearAndPlaySingle(uri);
  },

  _addAlbum() {
    let uri = this.get('album.uri');
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
