import Ember from 'ember';

export function formatDuration(params) {
  moment.duration.fn.format.defaults.trim = false;
  return moment.duration(params[0], 'milliseconds').format('m:ss');
}

export default Ember.Helper.helper(formatDuration);
