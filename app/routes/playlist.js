import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('mopidy').getPlaylist(params.uri);
  },
  
  afterModel(model) {
    let tracks = model['tracks'];
    
    if(tracks === undefined || tracks.length === 0) {
      this.controller.set('image', null);
    } else {
      let uri = tracks.get('firstObject.uri');
      this.get('mopidy').getImages([uri]).then((response) => {
        let images = response[uri];
        this.controller.set('image', images[2]['uri']);
      });
    }
  }
});
