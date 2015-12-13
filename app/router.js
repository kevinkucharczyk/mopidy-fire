import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('playlists');
  this.route('playlist', { path: '/playlist/:uri' });
  this.route('browse');
  this.route('search');
  this.route('settings');
});

export default Router;
