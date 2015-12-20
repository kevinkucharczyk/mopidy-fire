import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const mopidyMock = Ember.Service.extend({
  currentTrack: {
    artists: [{
      name: 'Test Artist'
    }],
    name: 'Test Track',
    length: 0,
    uri: 'testuri'
  }
});

moduleForComponent('mf-player', 'Integration | Component | mf player', {
  integration: true,

  beforeEach: function() {
    this.container.registry.register('service:mopidy', mopidyMock);
    this.container.registry.injection('component', 'mopidy', 'service:mopidy');
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
