import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['artist'],

  backgroundImage: Ember.computed('images', function() {
    var bg = this.get('images.2.uri');
    return Ember.String.htmlSafe('background-image: ' + bg);
  }),

  didReceiveAttrs() {
    let artist = this.get('artist');

    this.get('mopidy').getImages([artist.uri]).then((response) => {
      let images = response[artist.uri];
      this.set('images', images);
    });
  }
});
