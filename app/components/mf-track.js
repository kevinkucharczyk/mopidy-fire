import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'track'],

  click() {
    let track = this.get('track');
    this.get('mopidy').playTrack(track.uri);
  }
});
