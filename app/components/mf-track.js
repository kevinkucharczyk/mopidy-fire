import Ember from 'ember';

export default Ember.Component.extend({
  isQueue: false,

  classNames: ['row', 'track'],

  classNameBindings: ['isActive:active'],

  isActive: Ember.computed('mopidy.currentTrack', function() {
    return this.get('mopidy.currentTrack.uri') === this.get('track.uri');
  }),

  _playTrack() {
    if(this.get('isQueue')) {
      let tlid = this.get('tlid');
      this.get('mopidy').playTrack(tlid);
    } else {
      let track = this.get('track');
      this.get('mopidy').clearAndPlaySingle(track.uri);
    }
  },

  _addTrack() {
    let track = this.get('track');
    this.get('mopidy').addTrack(track.uri);
  },

  _removeTrack() {
    let track = this.get('track');
    this.get('mopidy').removeTrack(track.uri);
  },

  click(e) {
    if(!Ember.$(e.target).is('a')) {
      this._playTrack();
    }
  },

  actions: {
    play() {
      this._playTrack();
    },

    add() {
      this._addTrack();
    },

    remove() {
      this._removeTrack();
    }
  }
});
