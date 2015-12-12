import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  
  didReceiveAttrs() {
    let uri = this.get('track.uri');
    this.get('mopidy').getImages([uri]).then((response) => {
      let images = response[uri];
      this.set('image', images.get('lastObject.uri'));
    });
  },
  
  actions: {
    playTrack(track) {
      this.get('mopidy').playTrack(track);
    }
  }
});
