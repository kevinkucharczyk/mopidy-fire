import Ember from 'ember';

export default Ember.Service.extend({
  callCount: 0,
  show() {
    this.incrementProperty('callCount');
    if (this.get('callCount') === 1) {
      Ember.run.next(() => {
        Ember.$('.loader').show();
      });
    }
  },

  hide() {
    this.decrementProperty('callCount');
    if (this.get('callCount') < 0) {
      this.set('callCount', 0);
    }

    if (this.get('callCount') === 0) {
      Ember.run.next(() => {
        Ember.$('.loader').hide();
      });
    }
  }
});
