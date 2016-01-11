import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const mopidyMock = Ember.Service.extend({
  currentTrack: {
    artists: [{
      name: 'Test Artist'
    }],
    name: 'Test Track',
    length: 100,
    uri: 'testuri'
  },
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  currentPosition: 0
});

moduleForComponent('mf-player', 'Integration | Component | mf player', {
  integration: true,

  beforeEach: function() {
    this.register('service:mopidy', mopidyMock);
    this.inject.service('mopidy', { as: 'mopidy' });
  }
});

test('should show track title', function(assert) {
  this.render(hbs`{{mf-player}}`);

  assert.equal(this.$('.footer__track-title').text().trim(), 'Test Track');
});

test('should show track artist', function(assert) {
  this.render(hbs`{{mf-player}}`);

  assert.equal(this.$('.footer__track-artist').text().trim(), 'Test Artist');
});

test('should react to play pause changes', function(assert) {
  this.render(hbs`{{mf-player}}`);

  assert.ok(this.$('.control__icon--playpause').hasClass('fa-play'));

  this.set('mopidy.isPlaying', true);

  assert.ok(this.$('.control__icon--playpause').hasClass('fa-pause'));
});

test('should react to progress changes', function(assert) {
  this.render(hbs`{{mf-player}}`);

  assert.equal(this.$('.slider__bar-current')[0].style.width, '0%');

  this.set('mopidy.currentPosition', 50);

  assert.equal(this.$('.slider__bar-current')[0].style.width, '50%');
});

test('should react to shuffle state changes', function(assert) {
  this.render(hbs`{{mf-player}}`);

  assert.ok(this.$('.fa-random').parent().hasClass('inactive'));

  this.set('mopidy.isRandom', true);

  assert.notOk(this.$('.fa-random').parent().hasClass('inactive'));
});

test('should react to repeat state changes', function(assert) {
  this.render(hbs`{{mf-player}}`);

  assert.ok(this.$('.fa-repeat').parent().hasClass('inactive'));

  this.set('mopidy.isRepeat', true);

  assert.notOk(this.$('.fa-repeat').parent().hasClass('inactive'));
});

