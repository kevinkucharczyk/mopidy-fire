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

const mockAlbum = {
  name: 'Test Album 1',
  uri: 'testalbum1',
  date: '2016',
  tracks: [
    {
      name: 'Test Track 1',
      uri: 'testtrack1'
    }
  ]
};

moduleForComponent('mf-album', 'Integration | Component | mf album', {
  integration: true,

  beforeEach: function() {
    this.container.registry.register('service:mopidy', mopidyMock);
    this.container.registry.injection('component', 'mopidy', 'service:mopidy');
  }
});

test('should show image', function(assert) {
  this.set('album', mockAlbum);

  this.render(hbs`{{mf-album album=album tracks=album.tracks}}`);

  assert.equal(this.$('.album__image').data('image'), 'testimage3');
});

test('should show album name and date', function(assert) {
  this.set('album', mockAlbum);

  this.render(hbs`{{mf-album album=album tracks=album.tracks}}`);

  assert.equal(this.$('.album__name').text().trim(), 'Test Album 1 (2016)');
});

test('should show 1 track', function(assert) {
  this.set('album', mockAlbum);

  this.render(hbs`{{mf-album album=album tracks=album.tracks}}`);

  assert.equal(this.$('div').last().children().length, 1);
});

test('should only show album cover row in listView mode', function(assert) {
  this.set('album', mockAlbum);

  this.render(hbs`{{mf-album album=album tracks=album.tracks listView=true}}`);

  assert.equal(this.$('div').first().siblings().length, 0);
});