import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const trackMock = {
  name: 'Test Track',
  length: 60000,
  artists: [
    {
      name: 'Test Artist'
    }
  ],
  album: {
    name: 'Test Album'
  }
};

moduleForComponent('mf-track', 'Integration | Component | mf track', {
  integration: true
});

test('should show track title', function(assert) {
  this.set('track', trackMock);
  
  this.render(hbs`{{mf-track track=track}}`);

  assert.equal(this.$('.track__title').text().trim(), 'Test Track');
});

test('should show track artist', function(assert) {
  this.set('track', trackMock);
  
  this.render(hbs`{{mf-track track=track}}`);

  assert.equal(this.$('.track__artist').text().trim(), 'Test Artist');
});

test('should show track album', function(assert) {
  this.set('track', trackMock);
  
  this.render(hbs`{{mf-track track=track}}`);

  assert.equal(this.$('.track__album').text().trim(), 'Test Album');
});

test('should show track duration', function(assert) {
  this.set('track', trackMock);
  
  this.render(hbs`{{mf-track track=track}}`);

  assert.equal(this.$('.track__duration').text().trim(), '1:00');
});