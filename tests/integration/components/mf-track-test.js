import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/track';

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
  integration: true,

  beforeEach: function() {
    page.setContext(this);
  },

  afterEach() {
    page.removeContext();
  }
});

test('should show track title', function(assert) {
  this.set('track', trackMock);

  this.render(hbs`{{mf-track track=track}}`);

  assert.equal(page.trackTitle, 'Test Track');
});

test('should show track artist', function(assert) {
  this.set('track', trackMock);

  this.render(hbs`{{mf-track track=track}}`);

  assert.equal(page.trackArtist, 'Test Artist');
});

test('should show track album', function(assert) {
  this.set('track', trackMock);

  this.render(hbs`{{mf-track track=track}}`);

  assert.equal(page.trackAlbum, 'Test Album');
});

test('should show track duration', function(assert) {
  this.set('track', trackMock);

  this.render(hbs`{{mf-track track=track}}`);

  assert.equal(page.trackDuration, '1:00');
});
