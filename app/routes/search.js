import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.query) {
      return this.get('mopidy').search(params.query);
    } else {
      return null;
    }
  },

  actions: {
    onSubmit() {
      this.refresh();
    },

    onInput: _.debounce(function() {
      this.refresh();
    }, 500)
  }
});
