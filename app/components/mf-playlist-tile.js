import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['playlist-tile', 'small-6 medium-3 large-2'],

  didReceiveAttrs() {
    let tracks = this.get('playlist.tracks');
    this.set('tracksPlural', tracks === undefined || tracks.length !== 1);
    this.set('trackCount', tracks === undefined ? 0 : tracks.length);

    if(tracks === undefined || tracks.length === 0) {
      this.set('image', null);
    } else {
      let uri = tracks.get('firstObject.uri');
      this.get('mopidy').getImages([uri]).then((response) => {
        let images = response[uri];
        this.set('image', images[1]['uri']);
      });
    }
  }
});
