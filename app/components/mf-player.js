import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['footer'],

  currentTrack: Ember.computed('mopidy.currentTrack', function() {
      return this.get('mopidy.currentTrack');
  }),

  hasTrack: Ember.computed('currentTrack', function() {
    return this.get('currentTrack') !== null && this.get('currentTrack') !== undefined;
  })
});
