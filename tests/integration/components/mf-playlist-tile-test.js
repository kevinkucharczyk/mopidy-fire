import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const mopidyMock = Ember.Service.extend({
  getImages(args) {
    return new Ember.RSVP.Promise(function(resolve) {
      let response = {};
      response[args] = [
        {
          uri: 'testimage1'
        },
        {
          uri: 'testimage2'
        },
        {
          uri: 'testimage3'
        }];
      resolve(response);
    });
  }
});

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
  ]
};
  
const noPlaylist = {
  name: 'Test Playlist 1',
  uri: 'testplaylist1',
  tracks: []
};

moduleForComponent('mf-playlist-tile', 'Integration | Component | mf playlist tile', {
  integration: true,
  
  beforeEach: function() {
    this.container.registry.register('service:mopidy', mopidyMock);
    this.container.registry.injection('component', 'mopidy', 'service:mopidy');
  }
});

test('should show playlist title', function(assert) {
  this.set('playlist', longPlaylist);
    
  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);

  assert.equal(this.$('.playlist-tile__title').text().trim(), 'Test Playlist 1');
});

test('should show playlist track count 2', function(assert) {
  this.set('playlist', longPlaylist);
  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);

  assert.equal(this.$('.playlist-tile__subtitle').text().trim(), '2 tracks');
});

test('should show playlist track count 1', function(assert) {
  this.set('playlist', shortPlaylist);
  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);

  assert.equal(this.$('.playlist-tile__subtitle').text().trim(), '1 track');
});

test('should show playlist track count 0', function(assert) {
  this.set('playlist', noPlaylist);
  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);

  assert.equal(this.$('.playlist-tile__subtitle').text().trim(), '0 tracks');
});

test('should show playlist medium image', function(assert) {
  this.set('playlist', longPlaylist);
  this.render(hbs`{{mf-playlist-tile playlist=playlist}}`);
  
  assert.equal(this.$('.playlist-tile__cover').attr('src'), 'testimage2');
});

