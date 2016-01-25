import { moduleFor, test } from 'ember-qunit';

moduleFor('service:title-service', 'Unit | Service | title service', {
});

test('should set title with empty string', function(assert) {
  let service = this.subject();

  let title = '';

  service.setTitle(title);

  let documentTitle = document.title;
  let suffix = service.get('suffix');

  assert.equal(documentTitle, suffix);
});

test('should set title with null input', function(assert) {
  let service = this.subject();

  let title = null;

  service.setTitle(title);

  let documentTitle = document.title;
  let suffix = service.get('suffix');

  assert.equal(documentTitle, suffix);
});

test('should set title with 0 input', function(assert) {
  let service = this.subject();

  let title = 0;

  service.setTitle(title);

  let documentTitle = document.title;
  let suffix = service.get('suffix');
  let separator = service.get('separator');

  assert.equal(documentTitle, 0 + separator + suffix);
});

test('should set title with space input', function(assert) {
  let service = this.subject();

  let title = ' ';

  service.setTitle(title);

  let documentTitle = document.title;
  let suffix = service.get('suffix');

  assert.equal(documentTitle, suffix);
});

test('should set title with provided string', function(assert) {
  let service = this.subject();

  let title = 'Test Track - Test Artist';

  service.setTitle(title);

  let documentTitle = document.title;
  let suffix = service.get('suffix');
  let separator = service.get('separator');

  assert.equal(documentTitle, 'Test Track - Test Artist' + separator + suffix);
});