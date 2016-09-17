import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['slider'],

  mouseUp(e) {
    let x = e.pageX - this.$().offset().left;
    let totalWidth = this.$().width();

    let targetPosition = 0;

    if (x > totalWidth) {
      targetPosition = 100;
    } else if (x >= 0 && x<= totalWidth) {
      targetPosition = Math.round(100 * (x / totalWidth));
    }

    this.get('onMouseUp')(targetPosition);
  },

  sliderWidth: Ember.computed('currentPosition', function() {
    return new Ember.String.htmlSafe('width:' + this.get('currentPosition') + '%');
  })
});
