import Ember from 'ember';

export default Ember.Service.extend({
  suffix: 'Mopidy Fire',
  separator: ' | ',
  setTitle(value) {
    const title = value ? value.trim() : value;
    const suffix = this.get('suffix');
    const separator = this.get('separator');
    if(title !== '' && title !== null && title !== undefined) {
      document.title = title + separator + suffix;
    } else {
      document.title = suffix;
    }
  }
});
