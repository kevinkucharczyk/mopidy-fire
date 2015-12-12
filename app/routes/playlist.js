import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('mopidy').getPlaylist(params.uri);
  },
  
  actions: {
    play() {
      this.get('mopidy').play();
    },
    
    stop() {
      this.get('mopidy').stop();
    }
  }
});
