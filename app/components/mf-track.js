import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'track'],

  _playTrack() {
    let track = this.get('track');
    this.get('mopidy').playTrack(track.uri);
  },

  _addTrack() {
    let track = this.get('track');
    this.get('mopidy').addTrack(track.uri);
  },

  click() {
    this._playTrack();
  },

  actions: {
    play() {
      this._playTrack();
    },

    add() {
      this._addTrack();
    }
  }
});
