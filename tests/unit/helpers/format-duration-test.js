import { formatDuration } from '../../../helpers/format-duration';
import { module, test } from 'qunit';

module('Unit | Helper | format duration');

// Replace this with your real tests.
test('should return formatted duration', function(assert) {
  assert.expect(4);
  
  assert.equal(formatDuration([60000]), '1:00', '1:00');
  assert.equal(formatDuration([90000]), '1:30', '1:30');
  assert.equal(formatDuration([30000], '0:30'), '0:30');
  assert.equal(formatDuration([600000], '10:00'), '10:00');
});
