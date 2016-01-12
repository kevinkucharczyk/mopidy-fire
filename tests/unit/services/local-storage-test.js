import { moduleFor, test } from 'ember-qunit';

moduleFor('service:local-storage', 'Unit | Service | local storage', {
});

test('should save object to local storage', function(assert) {
  let service = this.subject();

  let testObject = { name: 'John Doe' };

  service.setItem('settings', testObject);

  let storedValue = window.localStorage.getItem('mopidyFire.settings');

  assert.equal(storedValue, '{"name":"John Doe"}');
});

test('should read object from local storage', function(assert) {
  let service = this.subject();

  let testObject = { name: 'John Doe' };

  window.localStorage.setItem('mopidyFire.settings', JSON.stringify(testObject));

  let storedValue = service.getItem('settings');

  assert.deepEqual(storedValue, testObject);
});

test('should clear object from local storage', function(assert) {
  let service = this.subject();

  let testObject = { name: 'John Doe' };

  window.localStorage.setItem('mopidyFire.settings', JSON.stringify(testObject));

  service.removeItem('settings');

  let storedValue = window.localStorage.getItem('mopidyFire.settings');

  assert.equal(storedValue, undefined);
});
