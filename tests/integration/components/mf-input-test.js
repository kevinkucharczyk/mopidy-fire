import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mf-input', 'Integration | Component | mf input', {
  integration: true
});

test('it renders', function(assert) {
  this.set('externalAction1', () => {
    assert.ok(true, 'calls first external action');
  });

  this.render(hbs`{{mf-input value=inputValue update=(action (mut inputValue))}}`);

  assert.equal(this.$().text().trim(), '');
});
