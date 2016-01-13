import Ember from 'ember';

export default Ember.Route.extend({
  localStorage: Ember.inject.service('local-storage'),

  setupController(controller) {
    const settings = this.get('localStorage').getItem('settings');
    if(settings && settings['url']) {
      controller.set('mopidyUrl', settings['url']);
    }
  },

  _save() {
    const mopidyUrl = this.get('controller.mopidyUrl');
    const settings = {
      url: mopidyUrl
    };
    this.get('localStorage').setItem('settings', settings);

    this.get('mopidy').reopen();
  },

  actions: {
    save() {
      this._save();
    }
  }
});
