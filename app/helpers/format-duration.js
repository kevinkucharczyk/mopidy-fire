import Ember from 'ember';

export function formatDuration(params) {
  return moment.duration(params[0], 'milliseconds').format();
}

export default Ember.Helper.helper(formatDuration);
