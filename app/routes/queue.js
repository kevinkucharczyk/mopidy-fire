import Ember from 'ember';

export default Ember.Route.extend({
  tracklist: Ember.observer('mopidy.tracklist', function() {
    this.refresh();
  }),

  model() {
    return this.get('mopidy').getTracklist();
  }
});
