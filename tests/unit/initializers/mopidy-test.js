import Ember from 'ember';
import MopidyInitializer from '../../../initializers/mopidy';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | mopidy', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  MopidyInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
