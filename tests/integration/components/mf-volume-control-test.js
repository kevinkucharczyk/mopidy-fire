import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const mopidyMock = Ember.Service.extend({
  currentVolume: 50,
  isMute: false
});

moduleForComponent('mf-volume-control', 'Integration | Component | mf volume control', {
  integration: true,

  beforeEach: function() {
    this.register('service:mopidy', mopidyMock);
    this.inject.service('mopidy', { as: 'mopidy' });
  }
});

test('should show volume state', function(assert) {
  this.render(hbs`{{mf-volume-control}}`);

  assert.equal(this.$('.slider__bar-current')[0].style.width, '50%');
});

test('should react to mute changes', function(assert) {
  this.render(hbs`{{mf-volume-control}}`);

  assert.ok(this.$('.control__icon--volume').hasClass('fa-volume-up'));

  this.set('mopidy.isMute', true);

  assert.equal(this.$('.slider__bar-current')[0].style.width, '0%');

  assert.ok(this.$('.control__icon--volume').hasClass('fa-volume-off'));
});

test('should trigger mute action on click', function(assert) {
  assert.expect(1);

  this.set('mopidy.toggleMute', () => {
    this.set('mopidy.isMute', !this.get('mopidy.isMute'));
    assert.equal(this.get('mopidy.isMute'), true);
  });

  this.render(hbs`{{mf-volume-control}}`);

  this.$('.control__icon--volume').click();
});