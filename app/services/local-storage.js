import Ember from 'ember';

export default Ember.Service.extend({
  storagePrefix: 'mopidyFire',

  _getPrefixedKey(key) {
    return this.get('storagePrefix') + '.' + key;
  },

  _deserialize(value) {
    return JSON.parse(value);
  },

  _serialize(value) {
    return JSON.stringify(value);
  },

  getItem(key) {
    let prefixedKey = this._getPrefixedKey(key);
    let localStorageValue = localStorage.getItem(prefixedKey);
    return this._deserialize(localStorageValue);
  },

  setItem(key, value) {
    let prefixedKey = this._getPrefixedKey(key);
    let serializedValue = this._serialize(value);
    localStorage.setItem(prefixedKey, serializedValue);
  }
});
