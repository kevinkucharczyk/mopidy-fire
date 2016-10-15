import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/context-menu';

moduleForComponent('mf-context-menu', 'Integration | Component | mf context menu', {
  integration: true,

  beforeEach() {
    page.setContext(this);
  },

  afterEach() {
    page.removeContext();
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{mf-context-menu}}`);

  assert.equal(page.content.trim(), '');

  this.render(hbs`
    {{#mf-context-menu}}
      template block text
    {{/mf-context-menu}}
  `);

  assert.equal(page.content.trim(), 'template block text');
});

test('correctly shows and hides popover', function(assert) {
  this.render(hbs`
    {{#mf-context-menu tagName="i" class="first-menu"}}
      internal text
    {{/mf-context-menu}}
    {{#mf-context-menu tagName="i" class="second-menu"}}
      internal text 2
    {{/mf-context-menu}}
  `);

  page.toggleFirst();

  assert.ok(page.firstIsOpen);

  page.toggleSecond();

  assert.notOk(page.firstIsOpen);
  assert.ok(page.secondIsOpen);
});

test('correctly calls external actions through component action', function(assert) {
  assert.expect(6);
  this.set('externalAction1', () => {
    assert.ok(true, 'calls first external action');
  });

  this.set('externalAction2', () => {
    assert.ok(true, 'calls second external action');
  });

  this.render(hbs`
    {{#mf-context-menu tagName="i" submitAction1=(action externalAction1) submitAction2=(action externalAction2) as |component|}}
      <button id="first-button" {{action 'handle' 'submitAction1' target=component}}>test</button>
      <button id="second-button" {{action 'handle' 'submitAction2' false target=component}}>test</button>
    {{/mf-context-menu}}
  `);

  page.toggle();

  assert.ok(page.isOpen, 'opens context menu after first click');

  this.$('#first-button').click();

  assert.notOk(page.isOpen, 'closes context menu after first click');

  page.toggle();

  assert.ok(page.isOpen, 'opens context menu after second click');

  this.$('#second-button').click();

  assert.ok(page.isOpen, 'keeps context menu open after second click');
});
