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

const mockArtist = {
  name: 'Test Artist 1',
  uri: 'testartist1'
};

moduleForComponent('mf-artist', 'Integration | Component | mf artist', {
  integration: true,

  beforeEach: function() {
    this.container.registry.register('service:mopidy', mopidyMock);
    this.container.registry.injection('component', 'mopidy', 'service:mopidy');
  }
});

test('should show image', function(assert) {
  this.set('artist', mockArtist);

  this.render(hbs`{{mf-artist artist=artist}}`);

  assert.equal(this.$('.artist__image').data('image'), 'testimage3');
});

test('should show artist name', function(assert) {
  this.set('artist', mockArtist);

  this.render(hbs`{{mf-artist artist=artist}}`);

  assert.equal(this.$('.artist__name').text().trim(), 'Test Artist 1');
});
