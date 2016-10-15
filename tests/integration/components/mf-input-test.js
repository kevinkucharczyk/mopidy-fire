import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/input';

moduleForComponent('mf-input', 'Integration | Component | mf input', {
  integration: true,

  beforeEach() {
    page.setContext(this);
  },

  afterEach() {
    page.removeContext();
  }
});

test('should call change action', function(assert) {
  assert.expect(1);

  this.set('changeAction', () => {
    assert.ok(true, 'calls change action');
  });

  this.render(hbs`{{mf-input onInput=changeAction value=(readonly inputValue) update=(action (mut inputValue))}}`);

  page.fillIn('test').change();
});

test('should call submit action', function(assert) {
  assert.expect(1);

  this.set('submitAction', () => {
    assert.ok(true, 'calls submit action');
  });

  this.render(hbs`{{mf-input onSubmit=submitAction value=(readonly inputValue) update=(action (mut inputValue))}}`);

  page.submit();
});

test('should mutate value', function(assert) {
  this.set('inputValue', 'test');

  this.render(hbs`{{mf-input value=(readonly inputValue) update=(action (mut inputValue))}}`);

  page.fillIn('test2').change();

  assert.equal(page.inputValue, 'test2');
});
