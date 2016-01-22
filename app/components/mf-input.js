import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  type: 'text',
  attributeBindings: [ 'type', 'value', 'placeholder', 'data-stripe', 'name' ],
  _sanitizedValue: undefined,

  input() { this._handleChangeEvent(); },
  change() { this._handleChangeEvent(); },
  keyPress(event) {
    if (event.which === 13 || event.keyCode === 13) {
      this.sendAction('onSubmit');
    }
  },

  _handleChangeEvent() {
    let value = this.readDOMAttr('value');
    this._processNewValue.call(this, value);
  },

  _processNewValue(rawValue) {
    let value = this.sanitizeInput(rawValue);

    if (this._sanitizedValue !== value) {
      this._sanitizedValue = value;
      this.attrs.update(value);
      this.sendAction('onInput');
    }
  },

  sanitizeInput: function(input) {
    return input;
  },

  didReceiveAttrs: function() {
    if (!this.attrs.update) {
      throw new Error(`You must provide an \`update\` action to \`{{${this.templateName}}}\`.`);
    }

    this._processNewValue.call(this, this.get('value'));
  }
});
