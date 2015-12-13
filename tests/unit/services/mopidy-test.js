import { moduleFor, test } from 'ember-qunit';

moduleFor('service:mopidy', 'Unit | Service | mopidy', {
  beforeEach: function() {
    window.Mopidy = function() { 
      this.on = function(callable) {
        callable("state:online");
      };
    };
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();

  assert.ok(service);
});
