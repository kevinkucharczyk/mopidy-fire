import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['artist'],

  didReceiveAttrs() {
    let artist = this.get('artist');

    this.get('mopidy').getImages([artist.uri]).then((response) => {
      let images = response[artist.uri];
      this.set('images', images);
    });
  }
});
