import Ember from 'ember';

export default Ember.Component.extend({
  currentPosition: 0,

  classNames: ['progress-indicator'],

  mouseUp(e) {
    let x = e.pageX - this.$().offset().left;
    let totalWidth = this.$().width();

    if(x >= 0 && x <= totalWidth) {
      let targetPosition = 100 * (x / totalWidth);
      this.set('currentPosition', targetPosition);
    }
  }
});
