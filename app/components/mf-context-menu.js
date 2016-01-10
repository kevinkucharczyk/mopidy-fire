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

  _open(e) {
    this.set('isOpen', true);
    let rightMargin = 10;
    let element = this.$('.context-menu__content'),
      content = Ember.$('.content'),
      body = Ember.$('body');
    let contentWidth = content.outerWidth(),
      bodyHeight = body.outerHeight(),
      elementWidth = element.outerWidth(),
      elementHeight = element.outerHeight();
    let totalWidth = e.pageX + elementWidth,
      totalHeight = e.pageY + elementHeight,
      left = e.pageX - rightMargin,
      top = e.pageY;

    if (totalWidth > contentWidth) {
      left = left - (totalWidth - contentWidth);
    }

    if (totalHeight > bodyHeight) {
      top = top - (totalHeight - bodyHeight);
    }

    element.css('top', top + 'px');
    element.css('left', left + 'px');
    this._registerHandler();
  },

  _close() {
    this.set('isOpen', false);
    this._unregisterHandler();
  },

  _toggle(e) {
    if(this.get('isOpen')) {
      this._close();
    } else {
      Ember.$(document).trigger('mf.contextMenu:hide');
      this._open(e);
    }
  },

  click(e) {
    const isToggleButton = this.$().is(e.target);
    if(isToggleButton) {
      this._toggle(e);
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
