import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/playlist-tile';

const longPlaylist = {
  name: 'Test Playlist 1',
  uri: 'testplaylist1',
  tracks: [
    {
      name: 'Test Track 1',
      uri: 'testtrack1'
    },
    {
      name: 'Test Track 2',
      uri: 'testtrack2'
    }
  ],
  images: [
    {
      uri: 'testimage1'
    },
    {
      uri: 'testimage2'
    },
    {
      uri: 'testimage3'
    }
  ]
};

const shortPlaylist = {
  name: 'Test Playlist 1',
  uri: 'testplaylist1',
  tracks: [
    {
      name: 'Test Track 1',
      uri: 'testtrack1'
    }
  ],
  images: [
    {
      uri: 'testimage1'
    },
    {
      uri: 'testimage2'
    },
    {
      uri: 'testimage3'
    }
  ]
};

const noPlaylist = {
  name: 'Test Playlist 1',
  uri: 'testplaylist1',
  tracks: []
};

moduleForComponent('mf-playlist-tile', 'Integration | Component | mf playlist tile', {
  integration: true,

  beforeEach() {
    page.setContext(this);
  },

  afterEach() {
    page.removeContext();
  }
});

test('should show playlist title', function(assert) {
  this.set('playlist', longPlaylist);

  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);

  assert.equal(page.title, 'Test Playlist 1');
});

test('should show playlist track count 2', function(assert) {
  this.set('playlist', longPlaylist);
  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);

  assert.equal(page.subtitle, '2 tracks');
});

test('should show playlist track count 1', function(assert) {
  this.set('playlist', shortPlaylist);
  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);

  assert.equal(page.subtitle, '1 track');
});

test('should show playlist track count 0', function(assert) {
  this.set('playlist', noPlaylist);
  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);

  assert.equal(page.subtitle, '0 tracks');
});

test('should show playlist medium image', function(assert) {
  this.set('playlist', longPlaylist);
  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);

  assert.equal(page.image, 'testimage2');
});

