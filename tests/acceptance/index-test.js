import { test } from 'qunit';
import moduleForAcceptance from 'mopidy-fire/tests/helpers/module-for-acceptance';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import Ember from 'ember';

var application;

const mopidyMock = Ember.Service.extend({
  getPlaylists() {
    return [];
  }
});

moduleForAcceptance('Acceptance | index', {
  beforeEach: function() {
    window.Mopidy = function() {
      return {
        connect: function() {
          return null;
        },

        on: function() {
          return null;
        }
      };
    };

    application = startApp();
    application.register('service:mopidyMock', mopidyMock);
    application.inject('route', 'mopidy', 'service:mopidyMock');
  },

  afterEach: function() {
    destroyApp(application);
  }
});

test('visiting index redirects to playlists', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/playlists');
  });
});
