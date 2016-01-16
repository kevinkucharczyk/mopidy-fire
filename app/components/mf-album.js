import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'album'],

  didReceiveAttrs() {
    let album = this.get('album');

    this.get('mopidy').getImages([album.uri]).then((response) => {
      let images = response[album.uri];
      this.set('images', images);
    });
  }
});
