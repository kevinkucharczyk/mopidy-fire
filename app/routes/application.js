import Ember from 'ember';

export default Ember.Route.extend({
  loaderService: Ember.inject.service('loader-service'),

  _handleResize() {
    let width = Ember.$(document).width();
    if (width >= 640) {
      this._showMenu();
    } else {
      this._hideMenu();
    }
  },

  _hideMenu() {
    let sidebar = Ember.$('.sidebar');
    let content = Ember.$('.content');
    let loader = Ember.$('.loader__image');
    sidebar.removeClass('open close').addClass('close');
    content.removeClass('full partial').addClass('full');
    loader.removeClass('full partial').addClass('full');
  },

  _showMenu() {
    let sidebar = Ember.$('.sidebar');
    let content = Ember.$('.content');
    let loader = Ember.$('.loader__image');
    sidebar.removeClass('open close').addClass('open');
    content.removeClass('full partial').addClass('partial');
    loader.removeClass('full partial').addClass('partial');
  },

  _toggleMenu() {
    Ember.run(() => {
      let sidebar = Ember.$('.sidebar');
      let content = Ember.$('.content');
      let loader = Ember.$('.loader__image');
      sidebar.toggleClass('open close');
      content.toggleClass('full partial');
      loader.toggleClass('full partial');
    });
  },

  setupController: function(){
    Ember.run.scheduleOnce('afterRender', this, () => {
      this._handleResize();
    });
    Ember.$(window).on('resize', Ember.run.bind(this, this._handleResize));
  },

  actions: {
    loading(transition) {
      this.get('loaderService').show();
      transition.promise.finally(() => {
        this.get('loaderService').hide();
      });
    },

    error(error) {
      this.get('loaderService').hide();
      this.controllerFor('error').set('error', error);
      return this.transitionTo('error');
    },

    toggleMenu() {
      this._toggleMenu();
    }
  }
});
