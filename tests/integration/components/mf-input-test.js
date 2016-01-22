import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mf-input', 'Integration | Component | mf input', {
  integration: true
});

test('should call change action', function(assert) {
  assert.expect(1);

  this.set('changeAction', () => {
    assert.ok(true, 'calls change action');
  });

  this.render(hbs`{{mf-input onInput=changeAction value=(readonly inputValue) update=(action (mut inputValue))}}`);

  this.$('input').val('test').trigger('change');
});

test('should call submit action', function(assert) {
  assert.expect(1);

  this.set('submitAction', () => {
    assert.ok(true, 'calls submit action');
  });

  this.render(hbs`{{mf-input onSubmit=submitAction value=(readonly inputValue) update=(action (mut inputValue))}}`);

  this.$('input').trigger($.Event('keypress', {which: 13}));
});

test('should mutate value', function(assert) {
  this.set('inputValue', 'test');

  this.render(hbs`{{mf-input value=(readonly inputValue) update=(action (mut inputValue))}}`);

  this.$('input').val('test2').trigger('change');

  assert.equal(this.get('inputValue'), 'test2');
});