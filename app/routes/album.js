import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('mopidy').getAlbum(params.uri);
  }
});
