import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    query: {
      replace: true
    }
  },
  query: null,

  actions: {
    onSubmit() {
      return true;
    },

    onInput() {
      return true;
    }
  }
});
