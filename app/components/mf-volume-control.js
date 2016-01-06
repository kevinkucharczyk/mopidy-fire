import Ember from 'ember';

export default Ember.Component.extend({
  mopidy: Ember.inject.service('mopidy'),

  classNames: ['volume-control'],

  isMute: Ember.computed('mopidy.isMute', function() {
    return this.get('mopidy.isMute');
  }),

  volume: Ember.computed('mopidy.currentVolume', 'mopidy.isMute', function() {
    let isMute = this.get('mopidy.isMute');
    if(isMute) {
      return 0;
    } else {
      return this.get('mopidy.currentVolume');
    }
  }),

  actions: {
    setVolume(volume) {
      this.get('mopidy').setVolume(volume);
    },

    toggleMute() {
      this.get('mopidy').toggleMute();
    }
  }
});
