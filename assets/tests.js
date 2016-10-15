'use strict';

define('mopidy-fire/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('mopidy-fire/tests/components/mf-album.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/mf-album.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mf-album.js should pass jshint.');
  });
});
define('mopidy-fire/tests/components/mf-artist.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/mf-artist.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mf-artist.js should pass jshint.');
  });
});
define('mopidy-fire/tests/components/mf-context-menu.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/mf-context-menu.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mf-context-menu.js should pass jshint.');
  });
});
define('mopidy-fire/tests/components/mf-input.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/mf-input.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mf-input.js should pass jshint.');
  });
});
define('mopidy-fire/tests/components/mf-player.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/mf-player.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mf-player.js should pass jshint.');
  });
});
define('mopidy-fire/tests/components/mf-playlist-tile.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/mf-playlist-tile.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mf-playlist-tile.js should pass jshint.');
  });
});
define('mopidy-fire/tests/components/mf-slider.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/mf-slider.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mf-slider.js should pass jshint.');
  });
});
define('mopidy-fire/tests/components/mf-track.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/mf-track.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mf-track.js should pass jshint.');
  });
});
define('mopidy-fire/tests/components/mf-volume-control.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/mf-volume-control.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mf-volume-control.js should pass jshint.');
  });
});
define('mopidy-fire/tests/controllers/error.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/error.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/error.js should pass jshint.');
  });
});
define('mopidy-fire/tests/controllers/search.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/search.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/search.js should pass jshint.');
  });
});
define('mopidy-fire/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('mopidy-fire/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('mopidy-fire/tests/helpers/format-duration.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/format-duration.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-duration.js should pass jshint.');
  });
});
define('mopidy-fire/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'mopidy-fire/tests/helpers/start-app', 'mopidy-fire/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _mopidyFireTestsHelpersStartApp, _mopidyFireTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _mopidyFireTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _mopidyFireTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('mopidy-fire/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('mopidy-fire/tests/helpers/resolver', ['exports', 'mopidy-fire/resolver', 'mopidy-fire/config/environment'], function (exports, _mopidyFireResolver, _mopidyFireConfigEnvironment) {

  var resolver = _mopidyFireResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _mopidyFireConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mopidyFireConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('mopidy-fire/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('mopidy-fire/tests/helpers/start-app', ['exports', 'ember', 'mopidy-fire/app', 'mopidy-fire/config/environment'], function (exports, _ember, _mopidyFireApp, _mopidyFireConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _mopidyFireConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _mopidyFireApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('mopidy-fire/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('mopidy-fire/tests/initializers/mopidy.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | initializers/mopidy.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/mopidy.js should pass jshint.');
  });
});
define('mopidy-fire/tests/integration/components/mf-album-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  var mopidyMock = _ember['default'].Service.extend({
    getImages: function getImages(args) {
      return new _ember['default'].RSVP.Promise(function (resolve) {
        var response = {};
        response[args] = [{
          uri: 'testimage1'
        }, {
          uri: 'testimage2'
        }, {
          uri: 'testimage3'
        }];
        resolve(response);
      });
    }
  });

  var mockAlbum = {
    name: 'Test Album 1',
    uri: 'testalbum1',
    date: '2016',
    tracks: [{
      name: 'Test Track 1',
      uri: 'testtrack1'
    }]
  };

  (0, _emberQunit.moduleForComponent)('mf-album', 'Integration | Component | mf album', {
    integration: true,

    beforeEach: function beforeEach() {
      this.container.registry.register('service:mopidy', mopidyMock);
      this.container.registry.injection('component', 'mopidy', 'service:mopidy');
    }
  });

  (0, _emberQunit.test)('should show image', function (assert) {
    this.set('album', mockAlbum);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 44
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-album', [], ['album', ['subexpr', '@mut', [['get', 'album', ['loc', [null, [1, 17], [1, 22]]], 0, 0, 0, 0]], [], [], 0, 0], 'tracks', ['subexpr', '@mut', [['get', 'album.tracks', ['loc', [null, [1, 30], [1, 42]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 44]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.album__image').data('image'), 'testimage3');
  });

  (0, _emberQunit.test)('should show album name and date', function (assert) {
    this.set('album', mockAlbum);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 44
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-album', [], ['album', ['subexpr', '@mut', [['get', 'album', ['loc', [null, [1, 17], [1, 22]]], 0, 0, 0, 0]], [], [], 0, 0], 'tracks', ['subexpr', '@mut', [['get', 'album.tracks', ['loc', [null, [1, 30], [1, 42]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 44]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.album__name').text().trim(), 'Test Album 1 (2016)');
  });

  (0, _emberQunit.test)('should show 1 track', function (assert) {
    this.set('album', mockAlbum);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 44
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-album', [], ['album', ['subexpr', '@mut', [['get', 'album', ['loc', [null, [1, 17], [1, 22]]], 0, 0, 0, 0]], [], [], 0, 0], 'tracks', ['subexpr', '@mut', [['get', 'album.tracks', ['loc', [null, [1, 30], [1, 42]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 44]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('div').last().children().length, 1);
  });

  (0, _emberQunit.test)('should only show album cover row in listView mode', function (assert) {
    this.set('album', mockAlbum);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 58
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-album', [], ['album', ['subexpr', '@mut', [['get', 'album', ['loc', [null, [1, 17], [1, 22]]], 0, 0, 0, 0]], [], [], 0, 0], 'tracks', ['subexpr', '@mut', [['get', 'album.tracks', ['loc', [null, [1, 30], [1, 42]]], 0, 0, 0, 0]], [], [], 0, 0], 'listView', true], ['loc', [null, [1, 0], [1, 58]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('div').first().siblings().length, 0);
  });
});
define('mopidy-fire/tests/integration/components/mf-album-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/mf-album-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/mf-album-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/integration/components/mf-artist-test', ['exports', 'ember-qunit', 'ember', 'mopidy-fire/tests/pages/artists'], function (exports, _emberQunit, _ember, _mopidyFireTestsPagesArtists) {

  var mopidyMock = _ember['default'].Service.extend({
    getImages: function getImages(args) {
      return new _ember['default'].RSVP.Promise(function (resolve) {
        var response = {};
        response[args] = [{
          uri: 'testimage1'
        }, {
          uri: 'testimage2'
        }, {
          uri: 'testimage3'
        }];
        resolve(response);
      });
    }
  });

  var mockArtist = {
    name: 'Test Artist 1',
    uri: 'testartist1'
  };

  (0, _emberQunit.moduleForComponent)('mf-artist', 'Integration | Component | mf artist', {
    integration: true,

    beforeEach: function beforeEach() {
      this.container.registry.register('service:mopidy', mopidyMock);
      this.container.registry.injection('component', 'mopidy', 'service:mopidy');
      this.set('artist', mockArtist);
      _mopidyFireTestsPagesArtists['default'].setContext(this);
    },

    afterEach: function afterEach() {
      _mopidyFireTestsPagesArtists['default'].removeContext();
    }
  });

  (0, _emberQunit.test)('should show image', function (assert) {
    _mopidyFireTestsPagesArtists['default'].render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 27
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-artist', [], ['artist', ['subexpr', '@mut', [['get', 'artist', ['loc', [null, [1, 19], [1, 25]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 27]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesArtists['default'].artistImage, 'testimage3');
  });

  (0, _emberQunit.test)('should show artist name', function (assert) {
    _mopidyFireTestsPagesArtists['default'].render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 27
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-artist', [], ['artist', ['subexpr', '@mut', [['get', 'artist', ['loc', [null, [1, 19], [1, 25]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 27]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesArtists['default'].artistName, 'Test Artist 1');
  });
});
define('mopidy-fire/tests/integration/components/mf-artist-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/mf-artist-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/mf-artist-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/integration/components/mf-context-menu-test', ['exports', 'ember-qunit', 'mopidy-fire/tests/pages/context-menu'], function (exports, _emberQunit, _mopidyFireTestsPagesContextMenu) {

  (0, _emberQunit.moduleForComponent)('mf-context-menu', 'Integration | Component | mf context menu', {
    integration: true,

    beforeEach: function beforeEach() {
      _mopidyFireTestsPagesContextMenu['default'].setContext(this);
    },

    afterEach: function afterEach() {
      _mopidyFireTestsPagesContextMenu['default'].removeContext();
    }
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 19
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-context-menu', ['loc', [null, [1, 0], [1, 19]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesContextMenu['default'].content.trim(), '');

    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.8.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'mf-context-menu', [], [], 0, null, ['loc', [null, [2, 4], [4, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(_mopidyFireTestsPagesContextMenu['default'].content.trim(), 'template block text');
  });

  (0, _emberQunit.test)('correctly shows and hides popover', function (assert) {
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.8.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      internal text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      var child1 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.8.2',
            'loc': {
              'source': null,
              'start': {
                'line': 5,
                'column': 4
              },
              'end': {
                'line': 7,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      internal text 2\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 8,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          return morphs;
        },
        statements: [['block', 'mf-context-menu', [], ['tagName', 'i', 'class', 'first-menu'], 0, null, ['loc', [null, [2, 4], [4, 24]]]], ['block', 'mf-context-menu', [], ['tagName', 'i', 'class', 'second-menu'], 1, null, ['loc', [null, [5, 4], [7, 24]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })()));

    _mopidyFireTestsPagesContextMenu['default'].toggleFirst();

    assert.ok(_mopidyFireTestsPagesContextMenu['default'].firstIsOpen);

    _mopidyFireTestsPagesContextMenu['default'].toggleSecond();

    assert.notOk(_mopidyFireTestsPagesContextMenu['default'].firstIsOpen);
    assert.ok(_mopidyFireTestsPagesContextMenu['default'].secondIsOpen);
  });

  (0, _emberQunit.test)('correctly calls external actions through component action', function (assert) {
    assert.expect(6);
    this.set('externalAction1', function () {
      assert.ok(true, 'calls first external action');
    });

    this.set('externalAction2', function () {
      assert.ok(true, 'calls second external action');
    });

    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.8.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 5,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      ');
            dom.appendChild(el0, el1);
            var el1 = dom.createElement('button');
            dom.setAttribute(el1, 'id', 'first-button');
            var el2 = dom.createTextNode('test');
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n      ');
            dom.appendChild(el0, el1);
            var el1 = dom.createElement('button');
            dom.setAttribute(el1, 'id', 'second-button');
            var el2 = dom.createTextNode('test');
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(fragment, [3]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element0);
            morphs[1] = dom.createElementMorph(element1);
            return morphs;
          },
          statements: [['element', 'action', ['handle', 'submitAction1'], ['target', ['get', 'component', ['loc', [null, [3, 73], [3, 82]]], 0, 0, 0, 0]], ['loc', [null, [3, 32], [3, 84]]], 0, 0], ['element', 'action', ['handle', 'submitAction2', false], ['target', ['get', 'component', ['loc', [null, [4, 80], [4, 89]]], 0, 0, 0, 0]], ['loc', [null, [4, 33], [4, 91]]], 0, 0]],
          locals: ['component'],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 6,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'mf-context-menu', [], ['tagName', 'i', 'submitAction1', ['subexpr', 'action', [['get', 'externalAction1', ['loc', [null, [2, 57], [2, 72]]], 0, 0, 0, 0]], [], ['loc', [null, [2, 49], [2, 73]]], 0, 0], 'submitAction2', ['subexpr', 'action', [['get', 'externalAction2', ['loc', [null, [2, 96], [2, 111]]], 0, 0, 0, 0]], [], ['loc', [null, [2, 88], [2, 112]]], 0, 0]], 0, null, ['loc', [null, [2, 4], [5, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    _mopidyFireTestsPagesContextMenu['default'].toggle();

    assert.ok(_mopidyFireTestsPagesContextMenu['default'].isOpen, 'opens context menu after first click');

    this.$('#first-button').click();

    assert.notOk(_mopidyFireTestsPagesContextMenu['default'].isOpen, 'closes context menu after first click');

    _mopidyFireTestsPagesContextMenu['default'].toggle();

    assert.ok(_mopidyFireTestsPagesContextMenu['default'].isOpen, 'opens context menu after second click');

    this.$('#second-button').click();

    assert.ok(_mopidyFireTestsPagesContextMenu['default'].isOpen, 'keeps context menu open after second click');
  });
});
define('mopidy-fire/tests/integration/components/mf-context-menu-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/mf-context-menu-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/mf-context-menu-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/integration/components/mf-input-test', ['exports', 'ember-qunit', 'mopidy-fire/tests/pages/input'], function (exports, _emberQunit, _mopidyFireTestsPagesInput) {

  (0, _emberQunit.moduleForComponent)('mf-input', 'Integration | Component | mf input', {
    integration: true,

    beforeEach: function beforeEach() {
      _mopidyFireTestsPagesInput['default'].setContext(this);
    },

    afterEach: function afterEach() {
      _mopidyFireTestsPagesInput['default'].removeContext();
    }
  });

  (0, _emberQunit.test)('should call change action', function (assert) {
    assert.expect(1);

    this.set('changeAction', function () {
      assert.ok(true, 'calls change action');
    });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 94
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-input', [], ['onInput', ['subexpr', '@mut', [['get', 'changeAction', ['loc', [null, [1, 19], [1, 31]]], 0, 0, 0, 0]], [], [], 0, 0], 'value', ['subexpr', 'readonly', [['get', 'inputValue', ['loc', [null, [1, 48], [1, 58]]], 0, 0, 0, 0]], [], ['loc', [null, [1, 38], [1, 59]]], 0, 0], 'update', ['subexpr', 'action', [['subexpr', 'mut', [['get', 'inputValue', ['loc', [null, [1, 80], [1, 90]]], 0, 0, 0, 0]], [], ['loc', [null, [1, 75], [1, 91]]], 0, 0]], [], ['loc', [null, [1, 67], [1, 92]]], 0, 0]], ['loc', [null, [1, 0], [1, 94]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    _mopidyFireTestsPagesInput['default'].fillIn('test').change();
  });

  (0, _emberQunit.test)('should call submit action', function (assert) {
    assert.expect(1);

    this.set('submitAction', function () {
      assert.ok(true, 'calls submit action');
    });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 95
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-input', [], ['onSubmit', ['subexpr', '@mut', [['get', 'submitAction', ['loc', [null, [1, 20], [1, 32]]], 0, 0, 0, 0]], [], [], 0, 0], 'value', ['subexpr', 'readonly', [['get', 'inputValue', ['loc', [null, [1, 49], [1, 59]]], 0, 0, 0, 0]], [], ['loc', [null, [1, 39], [1, 60]]], 0, 0], 'update', ['subexpr', 'action', [['subexpr', 'mut', [['get', 'inputValue', ['loc', [null, [1, 81], [1, 91]]], 0, 0, 0, 0]], [], ['loc', [null, [1, 76], [1, 92]]], 0, 0]], [], ['loc', [null, [1, 68], [1, 93]]], 0, 0]], ['loc', [null, [1, 0], [1, 95]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    _mopidyFireTestsPagesInput['default'].submit();
  });

  (0, _emberQunit.test)('should mutate value', function (assert) {
    this.set('inputValue', 'test');

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 73
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-input', [], ['value', ['subexpr', 'readonly', [['get', 'inputValue', ['loc', [null, [1, 27], [1, 37]]], 0, 0, 0, 0]], [], ['loc', [null, [1, 17], [1, 38]]], 0, 0], 'update', ['subexpr', 'action', [['subexpr', 'mut', [['get', 'inputValue', ['loc', [null, [1, 59], [1, 69]]], 0, 0, 0, 0]], [], ['loc', [null, [1, 54], [1, 70]]], 0, 0]], [], ['loc', [null, [1, 46], [1, 71]]], 0, 0]], ['loc', [null, [1, 0], [1, 73]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    _mopidyFireTestsPagesInput['default'].fillIn('test2').change();

    assert.equal(_mopidyFireTestsPagesInput['default'].inputValue, 'test2');
  });
});
define('mopidy-fire/tests/integration/components/mf-input-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/mf-input-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/mf-input-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/integration/components/mf-player-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  var mopidyMock = _ember['default'].Service.extend({
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

  (0, _emberQunit.moduleForComponent)('mf-player', 'Integration | Component | mf player', {
    integration: true,

    beforeEach: function beforeEach() {
      this.register('service:mopidy', mopidyMock);
      this.inject.service('mopidy', { as: 'mopidy' });
    }
  });

  (0, _emberQunit.test)('should show track title', function (assert) {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-player', ['loc', [null, [1, 0], [1, 13]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.footer__track-title').text().trim(), 'Test Track');
  });

  (0, _emberQunit.test)('should show track artist', function (assert) {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-player', ['loc', [null, [1, 0], [1, 13]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.footer__track-artist').text().trim(), 'Test Artist');
  });

  (0, _emberQunit.test)('should react to play pause changes', function (assert) {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-player', ['loc', [null, [1, 0], [1, 13]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.ok(this.$('.control__icon--playpause').hasClass('fa-play'));

    this.set('mopidy.isPlaying', true);

    assert.ok(this.$('.control__icon--playpause').hasClass('fa-pause'));
  });

  (0, _emberQunit.test)('should react to progress changes', function (assert) {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-player', ['loc', [null, [1, 0], [1, 13]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.slider__bar-current')[0].style.width, '0%');

    this.set('mopidy.currentPosition', 50);

    assert.equal(this.$('.slider__bar-current')[0].style.width, '50%');
  });

  (0, _emberQunit.test)('should react to shuffle state changes', function (assert) {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-player', ['loc', [null, [1, 0], [1, 13]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.ok(this.$('.fa-random').parent().hasClass('inactive'));

    this.set('mopidy.isRandom', true);

    assert.notOk(this.$('.fa-random').parent().hasClass('inactive'));
  });

  (0, _emberQunit.test)('should react to repeat state changes', function (assert) {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-player', ['loc', [null, [1, 0], [1, 13]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.ok(this.$('.fa-repeat').parent().hasClass('inactive'));

    this.set('mopidy.isRepeat', true);

    assert.notOk(this.$('.fa-repeat').parent().hasClass('inactive'));
  });
});
define('mopidy-fire/tests/integration/components/mf-player-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/mf-player-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/mf-player-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/integration/components/mf-playlist-tile-test', ['exports', 'ember-qunit', 'mopidy-fire/tests/pages/playlist-tile'], function (exports, _emberQunit, _mopidyFireTestsPagesPlaylistTile) {

  var longPlaylist = {
    name: 'Test Playlist 1',
    uri: 'testplaylist1',
    tracks: [{
      name: 'Test Track 1',
      uri: 'testtrack1'
    }, {
      name: 'Test Track 2',
      uri: 'testtrack2'
    }],
    images: [{
      uri: 'testimage1'
    }, {
      uri: 'testimage2'
    }, {
      uri: 'testimage3'
    }]
  };

  var shortPlaylist = {
    name: 'Test Playlist 1',
    uri: 'testplaylist1',
    tracks: [{
      name: 'Test Track 1',
      uri: 'testtrack1'
    }],
    images: [{
      uri: 'testimage1'
    }, {
      uri: 'testimage2'
    }, {
      uri: 'testimage3'
    }]
  };

  var noPlaylist = {
    name: 'Test Playlist 1',
    uri: 'testplaylist1',
    tracks: []
  };

  (0, _emberQunit.moduleForComponent)('mf-playlist-tile', 'Integration | Component | mf playlist tile', {
    integration: true,

    beforeEach: function beforeEach() {
      _mopidyFireTestsPagesPlaylistTile['default'].setContext(this);
    },

    afterEach: function afterEach() {
      _mopidyFireTestsPagesPlaylistTile['default'].removeContext();
    }
  });

  (0, _emberQunit.test)('should show playlist title', function (assert) {
    this.set('playlist', longPlaylist);

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 38
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-playlist-tile', [], ['playlist', ['subexpr', '@mut', [['get', 'playlist', ['loc', [null, [1, 28], [1, 36]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 38]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesPlaylistTile['default'].title, 'Test Playlist 1');
  });

  (0, _emberQunit.test)('should show playlist track count 2', function (assert) {
    this.set('playlist', longPlaylist);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 38
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-playlist-tile', [], ['playlist', ['subexpr', '@mut', [['get', 'playlist', ['loc', [null, [1, 28], [1, 36]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 38]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesPlaylistTile['default'].subtitle, '2 tracks');
  });

  (0, _emberQunit.test)('should show playlist track count 1', function (assert) {
    this.set('playlist', shortPlaylist);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 38
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-playlist-tile', [], ['playlist', ['subexpr', '@mut', [['get', 'playlist', ['loc', [null, [1, 28], [1, 36]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 38]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesPlaylistTile['default'].subtitle, '1 track');
  });

  (0, _emberQunit.test)('should show playlist track count 0', function (assert) {
    this.set('playlist', noPlaylist);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 38
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-playlist-tile', [], ['playlist', ['subexpr', '@mut', [['get', 'playlist', ['loc', [null, [1, 28], [1, 36]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 38]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesPlaylistTile['default'].subtitle, '0 tracks');
  });

  (0, _emberQunit.test)('should show playlist medium image', function (assert) {
    this.set('playlist', longPlaylist);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 38
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-playlist-tile', [], ['playlist', ['subexpr', '@mut', [['get', 'playlist', ['loc', [null, [1, 28], [1, 36]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 38]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesPlaylistTile['default'].image, 'testimage2');
  });
});
define('mopidy-fire/tests/integration/components/mf-playlist-tile-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/mf-playlist-tile-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/mf-playlist-tile-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/integration/components/mf-slider-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('mf-slider', 'Integration | Component | mf slider', {
    integration: true
  });

  (0, _emberQunit.test)('should have width 0', function (assert) {
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 31
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-slider', [], ['currentPosition', 0], ['loc', [null, [1, 0], [1, 31]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.slider__bar-current')[0].style.width, '0%');
  });

  (0, _emberQunit.test)('should have width 33', function (assert) {
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 32
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-slider', [], ['currentPosition', 33], ['loc', [null, [1, 0], [1, 32]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.slider__bar-current')[0].style.width, '33%');
  });

  (0, _emberQunit.test)('should trigger external action on mouse up', function (assert) {
    this.set('externalAction', function (actual) {
      var expected = 50;
      assert.equal(actual, expected);
    });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 65
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-slider', [], ['currentPosition', 0, 'onMouseUp', ['subexpr', 'action', [['get', 'externalAction', ['loc', [null, [1, 48], [1, 62]]], 0, 0, 0, 0]], [], ['loc', [null, [1, 40], [1, 63]]], 0, 0]], ['loc', [null, [1, 0], [1, 65]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    var offsetLeft = this.$().offset().left;
    var width = this.$().width();

    var mockEvent = $.Event("mouseup", {
      pageX: 0.5 * width + offsetLeft
    });

    this.$('.slider').trigger(mockEvent);
  });
});
define('mopidy-fire/tests/integration/components/mf-slider-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/mf-slider-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/mf-slider-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/integration/components/mf-track-test', ['exports', 'ember-qunit', 'mopidy-fire/tests/pages/track'], function (exports, _emberQunit, _mopidyFireTestsPagesTrack) {

  var trackMock = {
    name: 'Test Track',
    length: 60000,
    artists: [{
      name: 'Test Artist'
    }],
    album: {
      name: 'Test Album'
    }
  };

  (0, _emberQunit.moduleForComponent)('mf-track', 'Integration | Component | mf track', {
    integration: true,

    beforeEach: function beforeEach() {
      _mopidyFireTestsPagesTrack['default'].setContext(this);
    },

    afterEach: function afterEach() {
      _mopidyFireTestsPagesTrack['default'].removeContext();
    }
  });

  (0, _emberQunit.test)('should show track title', function (assert) {
    this.set('track', trackMock);

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 24
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-track', [], ['track', ['subexpr', '@mut', [['get', 'track', ['loc', [null, [1, 17], [1, 22]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 24]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesTrack['default'].trackTitle, 'Test Track');
  });

  (0, _emberQunit.test)('should show track artist', function (assert) {
    this.set('track', trackMock);

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 24
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-track', [], ['track', ['subexpr', '@mut', [['get', 'track', ['loc', [null, [1, 17], [1, 22]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 24]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesTrack['default'].trackArtist, 'Test Artist');
  });

  (0, _emberQunit.test)('should show track album', function (assert) {
    this.set('track', trackMock);

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 24
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-track', [], ['track', ['subexpr', '@mut', [['get', 'track', ['loc', [null, [1, 17], [1, 22]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 24]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesTrack['default'].trackAlbum, 'Test Album');
  });

  (0, _emberQunit.test)('should show track duration', function (assert) {
    this.set('track', trackMock);

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 24
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'mf-track', [], ['track', ['subexpr', '@mut', [['get', 'track', ['loc', [null, [1, 17], [1, 22]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 24]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(_mopidyFireTestsPagesTrack['default'].trackDuration, '1:00');
  });
});
define('mopidy-fire/tests/integration/components/mf-track-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/mf-track-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/mf-track-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/integration/components/mf-volume-control-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  var mopidyMock = _ember['default'].Service.extend({
    currentVolume: 50,
    isMute: false
  });

  (0, _emberQunit.moduleForComponent)('mf-volume-control', 'Integration | Component | mf volume control', {
    integration: true,

    beforeEach: function beforeEach() {
      this.register('service:mopidy', mopidyMock);
      this.inject.service('mopidy', { as: 'mopidy' });
    }
  });

  (0, _emberQunit.test)('should show volume state', function (assert) {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 21
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-volume-control', ['loc', [null, [1, 0], [1, 21]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.slider__bar-current')[0].style.width, '50%');
  });

  (0, _emberQunit.test)('should react to mute changes', function (assert) {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 21
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-volume-control', ['loc', [null, [1, 0], [1, 21]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.ok(this.$('.control__icon--volume').hasClass('fa-volume-up'));

    this.set('mopidy.isMute', true);

    assert.equal(this.$('.slider__bar-current')[0].style.width, '0%');

    assert.ok(this.$('.control__icon--volume').hasClass('fa-volume-off'));
  });

  (0, _emberQunit.test)('should trigger mute action on click', function (assert) {
    var _this = this;

    assert.expect(1);

    this.set('mopidy.toggleMute', function () {
      _this.set('mopidy.isMute', !_this.get('mopidy.isMute'));
      assert.equal(_this.get('mopidy.isMute'), true);
    });

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 21
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'mf-volume-control', ['loc', [null, [1, 0], [1, 21]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    this.$('.control__icon--volume').click();
  });
});
define('mopidy-fire/tests/integration/components/mf-volume-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/mf-volume-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/mf-volume-control-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/page-object', ['exports', 'ember-cli-page-object'], function (exports, _emberCliPageObject) {
  exports.attribute = _emberCliPageObject.attribute;
  exports.clickOnText = _emberCliPageObject.clickOnText;
  exports.clickable = _emberCliPageObject.clickable;
  exports.collection = _emberCliPageObject.collection;
  exports.contains = _emberCliPageObject.contains;
  exports.count = _emberCliPageObject.count;
  exports.create = _emberCliPageObject.create;
  exports.fillable = _emberCliPageObject.fillable;
  exports.selectable = _emberCliPageObject.fillable;
  exports.hasClass = _emberCliPageObject.hasClass;
  exports.is = _emberCliPageObject.is;
  exports.isHidden = _emberCliPageObject.isHidden;
  exports.isVisible = _emberCliPageObject.isVisible;
  exports.notHasClass = _emberCliPageObject.notHasClass;
  exports.property = _emberCliPageObject.property;
  exports.text = _emberCliPageObject.text;
  exports.triggerable = _emberCliPageObject.triggerable;
  exports.value = _emberCliPageObject.value;
  exports.visitable = _emberCliPageObject.visitable;
  exports['default'] = {
    attribute: _emberCliPageObject.attribute,
    clickOnText: _emberCliPageObject.clickOnText,
    clickable: _emberCliPageObject.clickable,
    collection: _emberCliPageObject.collection,
    contains: _emberCliPageObject.contains,
    count: _emberCliPageObject.count,
    create: _emberCliPageObject.create,
    fillable: _emberCliPageObject.fillable,
    hasClass: _emberCliPageObject.hasClass,
    is: _emberCliPageObject.is,
    isHidden: _emberCliPageObject.isHidden,
    isVisible: _emberCliPageObject.isVisible,
    notHasClass: _emberCliPageObject.notHasClass,
    property: _emberCliPageObject.property,
    selectable: _emberCliPageObject.fillable,
    text: _emberCliPageObject.text,
    triggerable: _emberCliPageObject.triggerable,
    value: _emberCliPageObject.value,
    visitable: _emberCliPageObject.visitable
  };
  Object.defineProperty(exports, 'buildSelector', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObject.buildSelector;
    }
  });
  Object.defineProperty(exports, 'findElementWithAssert', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObject.findElementWithAssert;
    }
  });
  Object.defineProperty(exports, 'findElement', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObject.findElement;
    }
  });
  Object.defineProperty(exports, 'getContext', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObject.getContext;
    }
  });
});
define('mopidy-fire/tests/pages/artists', ['exports', 'ember-cli-page-object'], function (exports, _emberCliPageObject) {
  exports['default'] = (0, _emberCliPageObject.create)({
    artistName: (0, _emberCliPageObject.text)('.artist__name'),
    artistImage: (0, _emberCliPageObject.attribute)('data-image', '.artist__image')
  });
});
define('mopidy-fire/tests/pages/artists.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | pages/artists.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pages/artists.js should pass jshint.');
  });
});
define('mopidy-fire/tests/pages/context-menu', ['exports', 'ember-cli-page-object'], function (exports, _emberCliPageObject) {
  exports['default'] = (0, _emberCliPageObject.create)({
    content: (0, _emberCliPageObject.text)('.context-menu__content'),
    toggle: (0, _emberCliPageObject.clickable)('i'),
    toggleFirst: (0, _emberCliPageObject.clickable)('i', { at: 0 }),
    toggleSecond: (0, _emberCliPageObject.clickable)('i', { at: 1 }),
    isOpen: (0, _emberCliPageObject.hasClass)('open', '.context-menu__content'),
    firstIsOpen: (0, _emberCliPageObject.hasClass)('open', '.context-menu__content', { at: 0 }),
    secondIsOpen: (0, _emberCliPageObject.hasClass)('open', '.context-menu__content', { at: 1 })
  });
});
define('mopidy-fire/tests/pages/context-menu.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | pages/context-menu.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pages/context-menu.js should pass jshint.');
  });
});
define('mopidy-fire/tests/pages/input', ['exports', 'ember-cli-page-object'], function (exports, _emberCliPageObject) {
  exports['default'] = (0, _emberCliPageObject.create)({
    fillIn: (0, _emberCliPageObject.fillable)('input'),
    inputValue: (0, _emberCliPageObject.value)('input'),
    change: (0, _emberCliPageObject.triggerable)('change', 'input'),
    submit: (0, _emberCliPageObject.triggerable)('keypress', 'input', { eventProperties: { keyCode: 13 } })
  });
});
define('mopidy-fire/tests/pages/input.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | pages/input.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pages/input.js should pass jshint.');
  });
});
define('mopidy-fire/tests/pages/playlist-tile', ['exports', 'ember-cli-page-object'], function (exports, _emberCliPageObject) {
  exports['default'] = (0, _emberCliPageObject.create)({
    title: (0, _emberCliPageObject.text)('.playlist-tile__title'),
    subtitle: (0, _emberCliPageObject.text)('.playlist-tile__subtitle'),
    image: (0, _emberCliPageObject.attribute)('src', '.playlist-tile__cover-image')
  });
});
define('mopidy-fire/tests/pages/playlist-tile.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | pages/playlist-tile.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pages/playlist-tile.js should pass jshint.');
  });
});
define('mopidy-fire/tests/pages/track', ['exports', 'ember-cli-page-object'], function (exports, _emberCliPageObject) {
  exports['default'] = (0, _emberCliPageObject.create)({
    trackAlbum: (0, _emberCliPageObject.text)('.track__album'),
    trackArtist: (0, _emberCliPageObject.text)('.track__artist'),
    trackDuration: (0, _emberCliPageObject.text)('.track__duration'),
    trackTitle: (0, _emberCliPageObject.text)('.track__title')
  });
});
define('mopidy-fire/tests/pages/track.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | pages/track.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pages/track.js should pass jshint.');
  });
});
define('mopidy-fire/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('mopidy-fire/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('mopidy-fire/tests/routes/album.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/album.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/album.js should pass jshint.');
  });
});
define('mopidy-fire/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('mopidy-fire/tests/routes/artist.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/artist.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/artist.js should pass jshint.');
  });
});
define('mopidy-fire/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('mopidy-fire/tests/routes/playlist.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/playlist.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/playlist.js should pass jshint.');
  });
});
define('mopidy-fire/tests/routes/playlists.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/playlists.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/playlists.js should pass jshint.');
  });
});
define('mopidy-fire/tests/routes/queue.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/queue.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/queue.js should pass jshint.');
  });
});
define('mopidy-fire/tests/routes/search.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/search.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/search.js should pass jshint.');
  });
});
define('mopidy-fire/tests/routes/settings.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/settings.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/settings.js should pass jshint.');
  });
});
define('mopidy-fire/tests/services/loader-service.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | services/loader-service.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/loader-service.js should pass jshint.');
  });
});
define('mopidy-fire/tests/services/local-storage.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | services/local-storage.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/local-storage.js should pass jshint.');
  });
});
define('mopidy-fire/tests/services/mopidy.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | services/mopidy.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/mopidy.js should pass jshint.');
  });
});
define('mopidy-fire/tests/services/title-service.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | services/title-service.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/title-service.js should pass jshint.');
  });
});
define('mopidy-fire/tests/test-helper', ['exports', 'mopidy-fire/tests/helpers/resolver', 'ember-qunit'], function (exports, _mopidyFireTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_mopidyFireTestsHelpersResolver['default']);
});
define('mopidy-fire/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/controllers/error-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:error', 'Unit | Controller | error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('mopidy-fire/tests/unit/controllers/error-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/error-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/error-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/controllers/search-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:search', 'Unit | Controller | search', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('mopidy-fire/tests/unit/controllers/search-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/search-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/search-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/helpers/format-duration-test', ['exports', 'mopidy-fire/helpers/format-duration', 'qunit'], function (exports, _mopidyFireHelpersFormatDuration, _qunit) {

  (0, _qunit.module)('Unit | Helper | format duration');

  // Replace this with your real tests.
  (0, _qunit.test)('should return formatted duration', function (assert) {
    assert.expect(4);

    assert.equal((0, _mopidyFireHelpersFormatDuration.formatDuration)([60000]), '1:00', '1:00');
    assert.equal((0, _mopidyFireHelpersFormatDuration.formatDuration)([90000]), '1:30', '1:30');
    assert.equal((0, _mopidyFireHelpersFormatDuration.formatDuration)([30000], '0:30'), '0:30');
    assert.equal((0, _mopidyFireHelpersFormatDuration.formatDuration)([600000], '10:00'), '10:00');
  });
});
define('mopidy-fire/tests/unit/helpers/format-duration-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/helpers/format-duration-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/format-duration-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/initializers/mopidy-test', ['exports', 'ember', 'mopidy-fire/initializers/mopidy', 'qunit'], function (exports, _ember, _mopidyFireInitializersMopidy, _qunit) {

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | mopidy', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _mopidyFireInitializersMopidy['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('mopidy-fire/tests/unit/initializers/mopidy-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/initializers/mopidy-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/mopidy-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/routes/album-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:album', 'Unit | Route | album', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mopidy-fire/tests/unit/routes/album-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/album-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/album-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/routes/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mopidy-fire/tests/unit/routes/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/routes/artist-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:artist', 'Unit | Route | artist', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mopidy-fire/tests/unit/routes/artist-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/artist-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/artist-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mopidy-fire/tests/unit/routes/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/routes/playlist-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:playlist', 'Unit | Route | playlist', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mopidy-fire/tests/unit/routes/playlist-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/playlist-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/playlist-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/routes/playlists-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:playlists', 'Unit | Route | playlists', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mopidy-fire/tests/unit/routes/playlists-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/playlists-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/playlists-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/routes/queue-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:queue', 'Unit | Route | queue', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mopidy-fire/tests/unit/routes/queue-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/queue-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/queue-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/routes/search-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:search', 'Unit | Route | search', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mopidy-fire/tests/unit/routes/search-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/search-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/search-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/routes/settings-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:settings', 'Unit | Route | settings', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mopidy-fire/tests/unit/routes/settings-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/settings-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/settings-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/services/loader-service-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:loader-service', 'Unit | Service | loader service', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('mopidy-fire/tests/unit/services/loader-service-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/services/loader-service-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/loader-service-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/services/local-storage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:local-storage', 'Unit | Service | local storage', {});

  (0, _emberQunit.test)('should save object to local storage', function (assert) {
    var service = this.subject();

    var testObject = { name: 'John Doe' };

    service.setItem('settings', testObject);

    var storedValue = window.localStorage.getItem('mopidyFire.settings');

    assert.equal(storedValue, '{"name":"John Doe"}');
  });

  (0, _emberQunit.test)('should read object from local storage', function (assert) {
    var service = this.subject();

    var testObject = { name: 'John Doe' };

    window.localStorage.setItem('mopidyFire.settings', JSON.stringify(testObject));

    var storedValue = service.getItem('settings');

    assert.deepEqual(storedValue, testObject);
  });

  (0, _emberQunit.test)('should clear object from local storage', function (assert) {
    var service = this.subject();

    var testObject = { name: 'John Doe' };

    window.localStorage.setItem('mopidyFire.settings', JSON.stringify(testObject));

    service.removeItem('settings');

    var storedValue = window.localStorage.getItem('mopidyFire.settings');

    assert.equal(storedValue, undefined);
  });
});
define('mopidy-fire/tests/unit/services/local-storage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/services/local-storage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/local-storage-test.js should pass jshint.');
  });
});
define("mopidy-fire/tests/unit/services/mopidy-test", ["exports"], function (exports) {});
// Temporarily disable mopidy service testing
// import { moduleFor, test } from 'ember-qunit';

// moduleFor('service:mopidy', 'Unit | Service | mopidy', {
//   beforeEach: function() {
//     window.Mopidy = function() {
//       this.on = function(callable) {
//         callable("state:online");
//       };
//     };
//   }
// });

// test('it exists', function(assert) {
//   let service = this.subject();

//   assert.ok(service);
// });
define('mopidy-fire/tests/unit/services/mopidy-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/services/mopidy-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/mopidy-test.js should pass jshint.');
  });
});
define('mopidy-fire/tests/unit/services/title-service-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:title-service', 'Unit | Service | title service', {});

  (0, _emberQunit.test)('should set title with empty string', function (assert) {
    var service = this.subject();

    var title = '';

    service.setTitle(title);

    var documentTitle = document.title;
    var suffix = service.get('suffix');

    assert.equal(documentTitle, suffix);
  });

  (0, _emberQunit.test)('should set title with null input', function (assert) {
    var service = this.subject();

    var title = null;

    service.setTitle(title);

    var documentTitle = document.title;
    var suffix = service.get('suffix');

    assert.equal(documentTitle, suffix);
  });

  (0, _emberQunit.test)('should set title with 0 input', function (assert) {
    var service = this.subject();

    var title = 0;

    service.setTitle(title);

    var documentTitle = document.title;
    var suffix = service.get('suffix');
    var separator = service.get('separator');

    assert.equal(documentTitle, 0 + separator + suffix);
  });

  (0, _emberQunit.test)('should set title with space input', function (assert) {
    var service = this.subject();

    var title = ' ';

    service.setTitle(title);

    var documentTitle = document.title;
    var suffix = service.get('suffix');

    assert.equal(documentTitle, suffix);
  });

  (0, _emberQunit.test)('should set title with provided string', function (assert) {
    var service = this.subject();

    var title = 'Test Track - Test Artist';

    service.setTitle(title);

    var documentTitle = document.title;
    var suffix = service.get('suffix');
    var separator = service.get('separator');

    assert.equal(documentTitle, 'Test Track - Test Artist' + separator + suffix);
  });
});
define('mopidy-fire/tests/unit/services/title-service-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/services/title-service-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/title-service-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('mopidy-fire/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map