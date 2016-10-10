import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import page from '../../pages/artists';

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
    this.set('artist', mockArtist);
    page.setContext(this);
  },

  afterEach() {
    page.removeContext();
  }
});

test('should show image', function(assert) {
  page.render(hbs`{{mf-artist artist=artist}}`);

  assert.equal(page.artistImage, 'testimage3');
});

test('should show artist name', function(assert) {
  page.render(hbs`{{mf-artist artist=artist}}`);

  assert.equal(page.artistName, 'Test Artist 1');
});
