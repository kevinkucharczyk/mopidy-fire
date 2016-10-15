import {
  create,
  text,
  clickable,
  hasClass
} from 'ember-cli-page-object';

export default create({
  content: text('.context-menu__content'),
  toggle: clickable('i'),
  toggleFirst: clickable('i', { at: 0 }),
  toggleSecond: clickable('i', { at: 1 }),
  isOpen: hasClass('open', '.context-menu__content'),
  firstIsOpen: hasClass('open', '.context-menu__content', { at: 0 }),
  secondIsOpen: hasClass('open', '.context-menu__content', { at: 1 }),
});
