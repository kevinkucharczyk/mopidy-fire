import Ember from 'ember';

export default Ember.Route.extend({
  loaderService: Ember.inject.service('loader-service'),

  actions: {
    loading(transition) {
      this.get('loaderService').show();
      transition.promise.finally(() => {
        this.get('loaderService').hide();
      });
    },

    error() {
      this.get('loaderService').hide();
      return this.transitionTo('error');
    }
  }
});
