import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['context-menu'],
  isOpen: false,

  _closeHandler() {
    if(this.get('isOpen')) {
      this._close();
    }
  },

  _registerHandler() {
    Ember.run.next(() => {
      Ember.$(document).on('click.mf.contextMenu', () => {
        this._closeHandler();
      });
    });
  },

  _unregisterHandler() {
    Ember.run.next(() => {
      Ember.$(document).off('click.mf.contextMenu');
    });
  },

  _open() {
    this.set('isOpen', true);
    this._registerHandler();
  },

  _close() {
    this.set('isOpen', false);
    this._unregisterHandler();
  },

  _toggle() {
    if(this.get('isOpen')) {
      this._close();
    } else {
      Ember.$(document).trigger('mf.contextMenu:hide');
      this._open();
    }
  },

  click(e) {
    const isToggleButton = this.$().is(e.target);
    if(isToggleButton) {
      this._toggle();
    }
    return false;
  },

  didInsertElement() {
    Ember.$(document).on('mf.contextMenu:hide', () => {
      this._close();
    });
  },

  willDestroyElement() {
    Ember.$(document).off('mf.contextMenu:hide');
  },

  actions: {
    handle(action, shouldClose = true) {
      if(shouldClose) {
        this._close();
      }
      this.get(action)();
    }
  }
});
