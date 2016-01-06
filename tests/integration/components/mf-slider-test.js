import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mf-slider', 'Integration | Component | mf slider', {
  integration: true
});

test('should have width 0', function(assert) {
  this.render(hbs`{{mf-slider currentPosition=0}}`);

  assert.equal(this.$('.slider__bar-current')[0].style.width, '0%');
});

test('should have width 33', function(assert) {
  this.render(hbs`{{mf-slider currentPosition=33}}`);

  assert.equal(this.$('.slider__bar-current')[0].style.width, '33%');
});

test('should trigger external action on mouse up', function(assert) {
  this.set('externalAction', (actual) => {
    let expected = 50;
    assert.equal(actual, expected);
  });

  this.render(hbs`{{mf-slider currentPosition=0 onMouseUp=(action externalAction)}}`);

  let offsetLeft = this.$().offset().left;
  let width = this.$().width();

  let mockEvent = $.Event( "mouseup", {
    pageX: 0.5 * width + offsetLeft
  });

  this.$('.slider').trigger(mockEvent);
});

