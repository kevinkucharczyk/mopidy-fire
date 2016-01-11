import Ember from 'ember';

export default Ember.Component.extend({
  mopidy: Ember.inject.service('mopidy'),
  classNames: ['footer'],

  isPlaying: Ember.computed('mopidy.isPlaying', function() {
    return this.get('mopidy.isPlaying');
  }),

  currentTrack: Ember.computed('mopidy.currentTrack', function() {
    return this.get('mopidy.currentTrack');
  }),

  hasTrack: Ember.computed('currentTrack', function() {
    return this.get('currentTrack') !== null && this.get('currentTrack') !== undefined;
  }),

  currentProgress: Ember.computed('mopidy.currentPosition', function() {
    return this.get('mopidy.currentPosition');
  }),

  currentProgressPercent: Ember.computed('mopidy.currentPosition', function() {
    let currentTrack = this.get('currentTrack');
    let length = 1;
    if(this.get('hasTrack')) {
      length = currentTrack.length;
    }
    let progress = this.get('mopidy.currentPosition');

    return 100 * (progress / length);
  }),

  actions: {
    togglePlayPause() {
      this.get('mopidy').togglePlayPause();
    },

    previous() {
      this.get('mopidy').previous();
    },

    next() {
      this.get('mopidy').next();
    },

    setProgress(position) {
      let trackLength = this.get('currentTrack.length');
      let positionScaled = trackLength * position / 100;
      this.get('mopidy').seek(positionScaled);
    }
  }
});
