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
      body = Ember.$('body'),
      doc = Ember.$(document),
      footer = Ember.$('.footer');
    let contentWidth = content.outerWidth(),
      bodyHeight = body.outerHeight(),
      elementWidth = element.outerWidth(),
      elementHeight = element.outerHeight(),
      footerHeight = footer.outerHeight(),
      scrollTop = doc.scrollTop(),
      contentOffset = content.offset() ? content.offset().left : 0;
    let pageX = e.pageX - contentOffset,
      pageY = e.pageY;
    let totalWidth = pageX + elementWidth,
      totalHeight = pageY + elementHeight,
      left = pageX - rightMargin,
      top = pageY;

    if (totalWidth > contentWidth) {
      left = left - (totalWidth - contentWidth);
    }

    if (totalHeight - scrollTop + footerHeight > bodyHeight) {
      top = top - (elementHeight);
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
