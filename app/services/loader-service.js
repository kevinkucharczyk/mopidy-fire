import Ember from 'ember';

export default Ember.Service.extend({
  show() {
    Ember.run.next(() => {
      Ember.$('.loader').show();
    });
  },

  hide() {
    Ember.run.next(() => {
      Ember.$('.loader').hide();
    });
  }
});
