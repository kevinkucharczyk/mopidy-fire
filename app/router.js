import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('playlists');
  this.route('playlist', { path: '/playlist/:uri' });
  this.route('search');
  this.route('settings');
  this.route('queue');
  this.route('error');
  this.route('artist', { path: '/artist/:uri' });
  this.route('album', { path: '/album/:uri' });
});

export default Router;
