import {
  create,
  fillable,
  triggerable,
  value
} from 'ember-cli-page-object';

export default create({
  fillIn: fillable('input'),
  inputValue: value('input'),
  change: triggerable('change', 'input'),
  submit: triggerable('keypress', 'input', { eventProperties: { keyCode: 13 } })
});
