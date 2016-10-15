"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('mopidy-fire/app', ['exports', 'ember', 'mopidy-fire/resolver', 'ember-load-initializers', 'mopidy-fire/config/environment'], function (exports, _ember, _mopidyFireResolver, _emberLoadInitializers, _mopidyFireConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _mopidyFireConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mopidyFireConfigEnvironment['default'].podModulePrefix,
    Resolver: _mopidyFireResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _mopidyFireConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('mopidy-fire/blueprints/page-object-component', ['exports', 'ember-cli-page-object/blueprints/page-object-component'], function (exports, _emberCliPageObjectBlueprintsPageObjectComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObjectBlueprintsPageObjectComponent['default'];
    }
  });
});
define('mopidy-fire/blueprints/page-object-helper', ['exports', 'ember-cli-page-object/blueprints/page-object-helper'], function (exports, _emberCliPageObjectBlueprintsPageObjectHelper) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObjectBlueprintsPageObjectHelper['default'];
    }
  });
});
define('mopidy-fire/blueprints/page-object', ['exports', 'ember-cli-page-object/blueprints/page-object'], function (exports, _emberCliPageObjectBlueprintsPageObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObjectBlueprintsPageObject['default'];
    }
  });
});
define('mopidy-fire/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'mopidy-fire/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _mopidyFireConfigEnvironment) {

  var name = _mopidyFireConfigEnvironment['default'].APP.name;
  var version = _mopidyFireConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('mopidy-fire/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('mopidy-fire/components/mf-album', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['album'],
    classNameBindings: ['listView:album--list-item'],
    listView: false,

    backgroundImage: _ember['default'].computed('images', function () {
      var bg = this.get('images.2.uri');
      return _ember['default'].String.htmlSafe('background-image: ' + bg);
    }),

    didReceiveAttrs: function didReceiveAttrs() {
      var _this = this;

      var album = this.get('album');

      this.get('mopidy').getImages([album.uri]).then(function (response) {
        var images = response[album.uri];
        _this.set('images', images);
      });
    },

    _playAlbum: function _playAlbum() {
      var uri = this.get('album.uri');
      this.get('mopidy').clearAndPlaySingle(uri);
    },

    _addAlbum: function _addAlbum() {
      var uri = this.get('album.uri');
      this.get('mopidy').addTrack(uri);
    },

    actions: {
      play: function play() {
        this._playAlbum();
      },

      add: function add() {
        this._addAlbum();
      }
    }
  });
});
define('mopidy-fire/components/mf-artist', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['artist'],

    backgroundImage: _ember['default'].computed('images', function () {
      var bg = this.get('images.2.uri');
      return _ember['default'].String.htmlSafe('background-image: ' + bg);
    }),

    didReceiveAttrs: function didReceiveAttrs() {
      var _this = this;

      var artist = this.get('artist');

      this.get('mopidy').getImages([artist.uri]).then(function (response) {
        var images = response[artist.uri];
        _this.set('images', images);
      });
    }
  });
});
define('mopidy-fire/components/mf-context-menu', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['context-menu'],
    isOpen: false,
    attachTo: null,

    _closeHandler: function _closeHandler() {
      if (this.get('isOpen')) {
        this._close();
      }
    },

    _registerHandler: function _registerHandler() {
      var _this = this;

      _ember['default'].run.next(function () {
        _ember['default'].$(document).on('click.mf.contextMenu', function () {
          _this._closeHandler();
        });
      });
    },

    _unregisterHandler: function _unregisterHandler() {
      _ember['default'].run.next(function () {
        _ember['default'].$(document).off('click.mf.contextMenu');
      });
    },

    _open: function _open(e) {
      this.set('isOpen', true);
      var rightMargin = 10;
      var element = this.$('.context-menu__content'),
          content = _ember['default'].$('.content'),
          body = _ember['default'].$('body'),
          doc = _ember['default'].$(document),
          footer = _ember['default'].$('.footer');
      var contentWidth = content.outerWidth(),
          bodyHeight = body.outerHeight(),
          elementWidth = element.outerWidth(),
          elementHeight = element.outerHeight(),
          footerHeight = footer.outerHeight(),
          scrollTop = doc.scrollTop(),
          contentOffsetLeft = content.offset() ? content.offset().left : 0,
          contentOffsetTop = content.offset() ? content.offset().top : 0;
      var pageX = e.pageX - contentOffsetLeft,
          pageY = e.pageY - contentOffsetTop;
      var totalWidth = pageX + elementWidth,
          totalHeight = pageY + elementHeight,
          left = pageX - rightMargin,
          top = pageY;

      if (totalWidth > contentWidth) {
        left = left - (totalWidth - contentWidth);
      }

      if (totalHeight - scrollTop + footerHeight > bodyHeight) {
        top = top - elementHeight;
      }

      element.css('top', top + 'px');
      element.css('left', left + 'px');
      if (this.get('attachTo')) {
        element.detach().appendTo(this.get('attachTo'));
      }
      this._registerHandler();
    },

    _close: function _close() {
      this.set('isOpen', false);
      this._unregisterHandler();
    },

    _toggle: function _toggle(e) {
      if (this.get('isOpen')) {
        this._close();
      } else {
        _ember['default'].$(document).trigger('mf.contextMenu:hide');
        this._open(e);
      }
    },

    click: function click(e) {
      var isToggleButton = this.$().is(e.target);
      if (isToggleButton) {
        this._toggle(e);
      }
      return false;
    },

    didInsertElement: function didInsertElement() {
      var _this2 = this;

      _ember['default'].$(document).on('mf.contextMenu:hide', function () {
        _this2._close();
      });
    },

    willDestroyElement: function willDestroyElement() {
      _ember['default'].$(document).off('mf.contextMenu:hide');
      this.set('isOpen', false);
    },

    actions: {
      handle: function handle(action) {
        var shouldClose = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        if (shouldClose) {
          this._close();
        }
        this.get(action)();
      }
    }
  });
});
define('mopidy-fire/components/mf-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'input',
    type: 'text',
    attributeBindings: ['type', 'value', 'placeholder', 'data-stripe', 'name'],
    _sanitizedValue: undefined,

    input: function input() {
      this._handleChangeEvent();
    },

    change: function change() {
      this._handleChangeEvent();
    },

    keyPress: function keyPress(event) {
      if (event.which === 13 || event.keyCode === 13) {
        this.sendAction('onSubmit');
      }
    },

    _handleChangeEvent: function _handleChangeEvent() {
      var value = this.readDOMAttr('value');
      this._processNewValue.call(this, value);
    },

    _processNewValue: function _processNewValue(rawValue) {
      var value = this.sanitizeInput(rawValue);

      if (this._sanitizedValue !== value) {
        this._sanitizedValue = value;
        this.attrs.update(value);
        this.sendAction('onInput');
      }
    },

    sanitizeInput: function sanitizeInput(input) {
      return input;
    },

    didReceiveAttrs: function didReceiveAttrs() {
      if (!this.attrs.update) {
        throw new Error('You must provide an `update` action to `{{' + this.templateName + '}}`.');
      }

      this._processNewValue.call(this, this.get('value'));
    }
  });
});
define('mopidy-fire/components/mf-player', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    mopidy: _ember['default'].inject.service('mopidy'),
    classNames: ['footer'],

    isRandom: _ember['default'].computed('mopidy.isRandom', function () {
      return this.get('mopidy.isRandom');
    }),

    isRepeat: _ember['default'].computed('mopidy.isRepeat', function () {
      return this.get('mopidy.isRepeat');
    }),

    isPlaying: _ember['default'].computed('mopidy.isPlaying', function () {
      return this.get('mopidy.isPlaying');
    }),

    currentTrack: _ember['default'].computed('mopidy.currentTrack', function () {
      return this.get('mopidy.currentTrack');
    }),

    hasTrack: _ember['default'].computed('currentTrack', function () {
      return this.get('currentTrack') !== null && this.get('currentTrack') !== undefined;
    }),

    currentProgress: _ember['default'].computed('mopidy.currentPosition', function () {
      return this.get('mopidy.currentPosition');
    }),

    currentProgressPercent: _ember['default'].computed('mopidy.currentPosition', function () {
      var currentTrack = this.get('currentTrack');
      var length = 1;
      if (this.get('hasTrack')) {
        length = currentTrack.length;
      }
      var progress = this.get('mopidy.currentPosition');

      return 100 * (progress / length);
    }),

    actions: {
      togglePlayPause: function togglePlayPause() {
        this.get('mopidy').togglePlayPause();
      },

      previous: function previous() {
        this.get('mopidy').previous();
      },

      next: function next() {
        this.get('mopidy').next();
      },

      random: function random() {
        var isRandom = this.get('isRandom');
        this.get('mopidy').setRandom(!isRandom);
      },

      repeat: function repeat() {
        var isRepeat = this.get('isRepeat');
        this.get('mopidy').setRepeat(!isRepeat);
      },

      setProgress: function setProgress(position) {
        var trackLength = this.get('currentTrack.length');
        var positionScaled = trackLength * position / 100;
        this.get('mopidy').seek(positionScaled);
      }
    }
  });
});
define('mopidy-fire/components/mf-playlist-tile', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['playlist-tile', 'small-6 medium-3 large-2'],
    linkType: 'playlist',

    didReceiveAttrs: function didReceiveAttrs() {
      var tracks = this.get('playlist.tracks');
      this.set('tracksPlural', tracks === undefined || tracks.length !== 1);
      this.set('trackCount', tracks === undefined ? 0 : tracks.length);
    },

    _playPlaylist: function _playPlaylist() {
      var uri = this.get('playlist.uri');
      this.get('mopidy').clearAndPlaySingle(uri);
    },

    _addPlaylist: function _addPlaylist() {
      var uri = this.get('playlist.uri');
      this.get('mopidy').addTrack(uri);
    },

    actions: {
      play: function play() {
        this._playPlaylist();
      },

      add: function add() {
        this._addPlaylist();
      }
    }
  });
});
define('mopidy-fire/components/mf-slider', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['slider'],

    mouseUp: function mouseUp(e) {
      var x = e.pageX - this.$().offset().left;
      var totalWidth = this.$().width();

      var targetPosition = 0;

      if (x > totalWidth) {
        targetPosition = 100;
      } else if (x >= 0 && x <= totalWidth) {
        targetPosition = Math.round(100 * (x / totalWidth));
      }

      this.get('onMouseUp')(targetPosition);
    },

    sliderWidth: _ember['default'].computed('currentPosition', function () {
      return new _ember['default'].String.htmlSafe('width:' + this.get('currentPosition') + '%');
    })
  });
});
define('mopidy-fire/components/mf-track', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    isQueue: false,

    classNames: ['row', 'track'],

    classNameBindings: ['isActive:active'],

    isActive: _ember['default'].computed('mopidy.currentTrack', function () {
      return this.get('mopidy.currentTrack.uri') === this.get('track.uri');
    }),

    _playTrack: function _playTrack() {
      if (this.get('isQueue')) {
        var tlid = this.get('tlid');
        this.get('mopidy').playTrack(tlid);
      } else {
        var track = this.get('track');
        this.get('mopidy').clearAndPlaySingle(track.uri);
      }
    },

    _addTrack: function _addTrack() {
      var track = this.get('track');
      this.get('mopidy').addTrack(track.uri);
    },

    _removeTrack: function _removeTrack() {
      var track = this.get('track');
      this.get('mopidy').removeTrack(track.uri);
    },

    click: function click(e) {
      if (!_ember['default'].$(e.target).is('a')) {
        this._playTrack();
      }
    },

    actions: {
      play: function play() {
        this._playTrack();
      },

      add: function add() {
        this._addTrack();
      },

      remove: function remove() {
        this._removeTrack();
      }
    }
  });
});
define('mopidy-fire/components/mf-volume-control', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    mopidy: _ember['default'].inject.service('mopidy'),

    classNames: ['volume-control'],

    isMute: _ember['default'].computed('mopidy.isMute', function () {
      return this.get('mopidy.isMute');
    }),

    volume: _ember['default'].computed('mopidy.currentVolume', 'mopidy.isMute', function () {
      var isMute = this.get('mopidy.isMute');
      if (isMute) {
        return 0;
      } else {
        return this.get('mopidy.currentVolume');
      }
    }),

    actions: {
      setVolume: function setVolume(volume) {
        this.get('mopidy').setVolume(volume);
      },

      toggleMute: function toggleMute() {
        this.get('mopidy').toggleMute();
      }
    }
  });
});
define('mopidy-fire/controllers/error', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('mopidy-fire/controllers/search', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    queryParams: {
      query: {
        replace: true
      }
    },
    query: null,

    actions: {
      onSubmit: function onSubmit() {
        return true;
      },

      onInput: function onInput() {
        return true;
      }
    }
  });
});
define('mopidy-fire/helpers/format-duration', ['exports', 'ember'], function (exports, _ember) {
  exports.formatDuration = formatDuration;

  function formatDuration(params) {
    moment.duration.fn.format.defaults.trim = false;
    return moment.duration(params[0], 'milliseconds').format('m:ss');
  }

  exports['default'] = _ember['default'].Helper.helper(formatDuration);
});
define('mopidy-fire/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('mopidy-fire/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('mopidy-fire/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'mopidy-fire/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _mopidyFireConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_mopidyFireConfigEnvironment['default'].APP.name, _mopidyFireConfigEnvironment['default'].APP.version)
  };
});
define('mopidy-fire/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('mopidy-fire/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('mopidy-fire/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('mopidy-fire/initializers/export-application-global', ['exports', 'ember', 'mopidy-fire/config/environment'], function (exports, _ember, _mopidyFireConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_mopidyFireConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _mopidyFireConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_mopidyFireConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('mopidy-fire/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('mopidy-fire/initializers/mopidy', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize(application) {
    application.inject('route', 'mopidy', 'service:mopidy');
    application.inject('controller', 'mopidy', 'service:mopidy');
    application.inject('component', 'mopidy', 'service:mopidy');
  }

  exports['default'] = {
    name: 'mopidy',
    initialize: initialize
  };
});
define('mopidy-fire/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('mopidy-fire/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("mopidy-fire/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('mopidy-fire/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('mopidy-fire/router', ['exports', 'ember', 'mopidy-fire/config/environment'], function (exports, _ember, _mopidyFireConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _mopidyFireConfigEnvironment['default'].locationType,
    rootURL: _mopidyFireConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('playlists');
    this.route('playlist', { path: '/playlist/:uri' });
    this.route('search');
    this.route('settings');
    this.route('queue');
    this.route('error');
    this.route('artist', { path: '/artist/:uri' });
    this.route('album', { path: '/album/:uri' });
  });

  exports['default'] = Router;
});
define('mopidy-fire/routes/album', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('mopidy').getAlbum(params.uri);
    },

    _playAlbum: function _playAlbum() {
      var uri = this.get('controller.model.album.uri');
      this.get('mopidy').clearAndPlaySingle(uri);
    },

    _addAlbum: function _addAlbum() {
      var uri = this.get('controller.model.album.uri');
      this.get('mopidy').addTrack(uri);
    },

    actions: {
      play: function play() {
        this._playAlbum();
      },

      add: function add() {
        this._addAlbum();
      }
    }
  });
});
define('mopidy-fire/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    loaderService: _ember['default'].inject.service('loader-service'),

    _handleResize: function _handleResize() {
      var width = _ember['default'].$(document).width();
      if (width >= 640) {
        this._showMenu();
      } else {
        this._hideMenu();
      }
    },

    _hideMenu: function _hideMenu() {
      var sidebar = _ember['default'].$('.sidebar');
      var content = _ember['default'].$('.content');
      var loader = _ember['default'].$('.loader__image');
      sidebar.removeClass('open close').addClass('close');
      content.removeClass('full partial').addClass('full');
      loader.removeClass('full partial').addClass('full');
    },

    _showMenu: function _showMenu() {
      var sidebar = _ember['default'].$('.sidebar');
      var content = _ember['default'].$('.content');
      var loader = _ember['default'].$('.loader__image');
      sidebar.removeClass('open close').addClass('open');
      content.removeClass('full partial').addClass('partial');
      loader.removeClass('full partial').addClass('partial');
    },

    _toggleMenu: function _toggleMenu() {
      _ember['default'].run(function () {
        var sidebar = _ember['default'].$('.sidebar');
        var content = _ember['default'].$('.content');
        var loader = _ember['default'].$('.loader__image');
        sidebar.toggleClass('open close');
        content.toggleClass('full partial');
        loader.toggleClass('full partial');
      });
    },

    setupController: function setupController() {
      var _this = this;

      _ember['default'].run.scheduleOnce('afterRender', this, function () {
        _this._handleResize();
      });
      _ember['default'].$(window).on('resize', _ember['default'].run.bind(this, this._handleResize));
    },

    actions: {
      loading: function loading(transition) {
        var _this2 = this;

        this.get('loaderService').show();
        transition.promise['finally'](function () {
          _this2.get('loaderService').hide();
        });
      },

      error: function error(_error) {
        this.get('loaderService').hide();
        this.controllerFor('error').set('error', _error);
        return this.transitionTo('error');
      },

      toggleMenu: function toggleMenu() {
        this._toggleMenu();
      }
    }
  });
});
define('mopidy-fire/routes/artist', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    _removeUnplayable: function _removeUnplayable(data) {
      var tracks = data;
      _.remove(tracks, function (track) {
        return track.name.indexOf('[unplayable]') > -1;
      });

      return tracks;
    },

    _getArtist: function _getArtist(data, uri) {
      return _.chain(data).map(function (track) {
        return track.artists[0];
      }).find({ uri: uri }).value();
    },

    _getAlbums: function _getAlbums(data) {
      return _.chain(data).map(function (track) {
        return track.album;
      }).uniqBy(function (album) {
        return album.uri;
      }).sortBy('date').value();
    },

    _groupTracksByAlbum: function _groupTracksByAlbum(data) {
      return _.groupBy(data, function (track) {
        return track.album.uri;
      });
    },

    _extractAlbums: function _extractAlbums(data, uri) {
      var _this = this;

      var tracksByAlbum = this._groupTracksByAlbum(data);
      var allAlbums = this._getAlbums(data);

      var albums = [],
          singles = [],
          appearsOn = [],
          albumUris = [],
          promiseArray = [];

      _.forEachRight(allAlbums, function (album) {
        var tracks = tracksByAlbum[album.uri];
        album['tracks'] = tracks;
        albumUris.push(album.uri);

        if (album.artists[0].uri === uri) {
          // check if main artist or 3rd party album
          if (tracks.length > 4) {
            // full album or single
            albums.push(album);
          } else {
            singles.push(album);
          }
        } else {
          appearsOn.push(album);
        }

        var result = _this.get('mopidy').getImages([album.uri]).then(function (response) {
          album['images'] = response[album.uri];
          return album;
        });
        promiseArray.push(result);
      });

      return {
        albums: albums,
        singles: singles,
        appearsOn: appearsOn,
        albumUris: albumUris,
        promiseArray: promiseArray
      };
    },

    model: function model(params) {
      var _this2 = this;

      return this.get('mopidy').lookup(params.uri).then(function (model) {
        var uri = params.uri;

        var data = _this2._removeUnplayable(model);

        var artist = _this2._getArtist(data, uri);

        var extractedAlbums = _this2._extractAlbums(data, uri);

        return _this2.get('mopidy').getImages([artist.uri]).then(function (data) {
          artist['images'] = data[artist.uri];

          return _ember['default'].RSVP.all(extractedAlbums.promiseArray).then(function () {
            return {
              artist: artist,
              albums: extractedAlbums.albums,
              singles: extractedAlbums.singles,
              appearsOn: extractedAlbums.appearsOn
            };
          });
        });
      });
    }
  });
});
define('mopidy-fire/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('mopidy-fire/routes/playlist', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('mopidy').getPlaylist(params.uri);
    },

    afterModel: function afterModel(model) {
      var _this = this;

      var tracks = model['tracks'];
      if (tracks === undefined || tracks.length === 0) {
        this.controller.set('image', null);
      } else {
        (function () {
          var uri = tracks.get('firstObject.uri');
          _this.get('mopidy').getImages([uri]).then(function (response) {
            var images = response[uri];
            _this.controller.set('image', images[0]['uri']);
          });
        })();
      }
    }
  });
});
define('mopidy-fire/routes/playlists', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('mopidy').getPlaylists();
    }
  });
});
define('mopidy-fire/routes/queue', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    tracklist: _ember['default'].observer('mopidy.tracklist', function () {
      this.refresh();
    }),

    model: function model() {
      return this.get('mopidy').getTracklist();
    }
  });
});
define('mopidy-fire/routes/search', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      var _this = this;

      if (params.query) {
        return this.get('mopidy').search(params.query).then(function (result) {
          var items = result[0];
          var promiseArray = [];
          _.forEach(items.albums, function (album) {
            var promise = _this.get('mopidy').getAlbum(album.uri).then(function (response) {
              album = response.album;
              album['tracks'] = response.tracks;
              return album;
            });
            promiseArray.push(promise);
          });

          return _ember['default'].RSVP.all(promiseArray).then(function (results) {
            items.albums = results;
            return items;
          });
        });
      } else {
        return null;
      }
    },

    actions: {
      onSubmit: function onSubmit() {
        this.refresh();
      },

      onInput: _.debounce(function () {
        this.refresh();
      }, 500)
    }
  });
});
define('mopidy-fire/routes/settings', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    localStorage: _ember['default'].inject.service('local-storage'),

    setupController: function setupController(controller) {
      var settings = this.get('localStorage').getItem('settings');
      if (settings && settings['url']) {
        controller.set('mopidyUrl', settings['url']);
      }
    },

    _save: function _save() {
      var mopidyUrl = this.get('controller.mopidyUrl');
      var settings = {
        url: mopidyUrl
      };
      this.get('localStorage').setItem('settings', settings);

      this.get('mopidy').reopen();
    },

    actions: {
      save: function save() {
        this._save();
      }
    }
  });
});
define('mopidy-fire/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('mopidy-fire/services/loader-service', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({
    callCount: 0,
    show: function show() {
      this.incrementProperty('callCount');
      if (this.get('callCount') === 1) {
        _ember['default'].run.next(function () {
          _ember['default'].$('.loader').show();
        });
      }
    },

    hide: function hide() {
      this.decrementProperty('callCount');
      if (this.get('callCount') < 0) {
        this.set('callCount', 0);
      }

      if (this.get('callCount') === 0) {
        _ember['default'].run.next(function () {
          _ember['default'].$('.loader').hide();
        });
      }
    }
  });
});
define('mopidy-fire/services/local-storage', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({
    storagePrefix: 'mopidyFire',

    _getPrefixedKey: function _getPrefixedKey(key) {
      return this.get('storagePrefix') + '.' + key;
    },

    _deserialize: function _deserialize(value) {
      return JSON.parse(value);
    },

    _serialize: function _serialize(value) {
      return JSON.stringify(value);
    },

    getItem: function getItem(key) {
      var prefixedKey = this._getPrefixedKey(key);
      var localStorageValue = localStorage.getItem(prefixedKey);
      return this._deserialize(localStorageValue);
    },

    setItem: function setItem(key, value) {
      var prefixedKey = this._getPrefixedKey(key);
      var serializedValue = this._serialize(value);
      localStorage.setItem(prefixedKey, serializedValue);
    },

    removeItem: function removeItem(key) {
      var prefixedKey = this._getPrefixedKey(key);
      localStorage.removeItem(prefixedKey);
    }
  });
});
define('mopidy-fire/services/mopidy', ['exports', 'ember'], function (exports, _ember) {

  var Timer = _ember['default'].Object.extend({
    interval: 1000,
    timestamp: 0,
    callback: null,

    schedule: function schedule(f) {
      return _ember['default'].run.later(this, function () {
        var currentTimestamp = this.get('timestamp');
        var newTimestamp = Date.now();
        var timeDiff = newTimestamp - currentTimestamp;
        this.set('timestamp', newTimestamp);
        f.apply(this, [timeDiff]);
        this.set('timer', this.schedule(f));
      }, this.get('interval'));
    },

    stop: function stop() {
      _ember['default'].run.cancel(this.get('timer'));
    },

    start: function start() {
      var timestamp = Date.now();
      this.set('timestamp', timestamp);
      this.set('timer', this.schedule(this.get('callback')));
    }
  });

  exports['default'] = _ember['default'].Service.extend({
    currentTrack: null,
    currentVolume: 0,
    isMute: false,
    isPlaying: false,
    currentPosition: 0,
    tracklist: null,
    isRandom: false,
    isRepeat: false,
    isConnected: false,

    progressTracker: null,

    loaderService: _ember['default'].inject.service('loader-service'),
    titleService: _ember['default'].inject.service('title-service'),
    localStorage: _ember['default'].inject.service('local-storage'),

    init: function init() {
      this._super.apply(this, arguments);
      this._connect();

      var service = this;
      var progressTracker = Timer.create({
        callback: function callback(difference) {
          var currentPosition = service.get('currentPosition');
          var newPosition = currentPosition + difference;
          service.set('currentPosition', newPosition);
        }
      });

      this.set('progressTracker', progressTracker);
    },

    _getMopidyUrl: function _getMopidyUrl() {
      var settings = this.get('localStorage').getItem('settings');
      if (settings === undefined || settings === null || settings === {} || settings['url'] === undefined || settings['url'] === null) {
        return 'localhost:6680';
      } else {
        return settings['url'];
      }
    },

    open: function open() {
      this._connect();
    },

    close: function close() {
      this._disconnect();
    },

    reopen: function reopen() {
      this._reopen();
    },

    _connect: function _connect() {
      var _this = this;

      var mopidyUrl = this._getMopidyUrl();
      var options = {
        autoConnect: false,
        callingConvention: 'by-position-or-by-name',
        webSocketUrl: 'ws://' + mopidyUrl + '/mopidy/ws'
      };
      var mopidy = new Mopidy(options);

      mopidy.connect();
      var mopidyCaller = new _ember['default'].RSVP.Promise(function (resolve, reject) {
        mopidy.on(function (event, err) {
          if (event === "state:online") {
            window.mopidy = mopidy; // attach mopidy to window for debugging purposes
            _this._initPlayer();
            _this._initListeners();
            _this.set('isConnected', true);
            resolve(mopidy);
          }
          if (event === 'websocket:error') {
            _this.get('loaderService').hide();
            _this._disconnect();
            _this.set('isConnected', false);
            reject({
              event: err,
              name: 'ConnectionError',
              message: 'Could not connect to Mopidy'
            });
          }
        });
      });

      this.set('mopidy', mopidy);
      this.set('mopidyCaller', mopidyCaller);
    },

    _disconnect: function _disconnect() {
      var mopidy = this.get('mopidy');

      mopidy.close();
      mopidy.off();
    },

    _reopen: function _reopen() {
      this._disconnect();
      this._connect();
    },

    _initPlayer: function _initPlayer() {
      var _this2 = this;

      this._call('playback', 'getCurrentTrack').then(function (data) {
        _this2.set('currentTrack', data);
        if (data) {
          _this2.get('titleService').setTitle(data.name + ' - ' + data.artists[0].name);
        }
      });

      this._call('playback', 'getTimePosition').then(function (data) {
        _this2.set('currentPosition', data);
      });

      this._call('playback', 'getState').then(function (data) {
        if (data === 'playing') {
          _this2.set('isPlaying', true);
          _this2.get('progressTracker').start();
        }
      });

      this.getTracklist().then(function (data) {
        _this2.set('tracklist', data);
      });

      this.getVolume().then(function (volume) {
        _this2.set('currentVolume', volume);
      });

      this.getMute().then(function (state) {
        _this2.set('isMute', state);
      });

      this._updateOptions();
    },

    _updateOptions: function _updateOptions() {
      var _this3 = this;

      this.getRandom().then(function (state) {
        _this3.set('isRandom', state);
      });

      this.getRepeat().then(function (state) {
        _this3.set('isRepeat', state);
      });
    },

    _initListeners: function _initListeners() {
      var _this4 = this;

      var mopidy = this.get('mopidy');

      mopidy.on('event:trackPlaybackStarted', function (data) {
        var track = data.tl_track.track;
        _this4.set('currentTrack', track);
        _this4.set('isPlaying', true);
        _this4.set('currentPosition', 0);
        _this4.get('titleService').setTitle(track.name + ' - ' + track.artists[0].name);
        _this4.get('progressTracker').start();
      });

      mopidy.on('event:trackPlaybackResumed', function (data) {
        var track = data.tl_track.track;
        var timePosition = data.time_position;
        _this4.set('currentTrack', track);
        _this4.set('isPlaying', true);
        _this4.set('currentPosition', timePosition);
        _this4.get('titleService').setTitle(track.name + ' - ' + track.artists[0].name);
        _this4.get('progressTracker').start();
      });

      mopidy.on('event:trackPlaybackPaused', function (data) {
        var track = data.tl_track.track;
        var timePosition = data.time_position;
        _this4.set('currentTrack', track);
        _this4.set('isPlaying', false);
        _this4.set('currentPosition', timePosition);
        _this4.get('progressTracker').stop();
      });

      mopidy.on('event:trackPlaybackEnded', function (data) {
        var timePosition = data.time_position;
        _this4.set('isPlaying', false);
        _this4.set('currentPosition', timePosition);
        _this4.get('progressTracker').stop();
      });

      mopidy.on('event:tracklistChanged', function () {
        _this4.getTracklist().then(function (data) {
          _this4.set('tracklist', data);
        });
      });

      mopidy.on('event:seeked', function (data) {
        var timePosition = data.time_position;
        _this4.set('currentPosition', timePosition);
      });

      mopidy.on('event:volumeChanged', function (data) {
        var volume = data.volume;
        _this4.set('currentVolume', volume);
      });

      mopidy.on('event:muteChanged', function (state) {
        var muteState = state.mute;
        _this4.set('isMute', muteState);
      });

      mopidy.on('event:optionsChanged', function () {
        _this4._updateOptions();
      });
    },

    _call: function _call(ns, func) {
      var _this5 = this;

      var args = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

      this.get('loaderService').show();
      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        _this5.get('mopidyCaller').then(function (mopidy) {
          var mopidyFunction = mopidy[ns][func];

          (args === undefined ? mopidyFunction() : mopidyFunction(args)).then(function (result) {
            _this5.get('loaderService').hide();
            resolve(result);
          })['catch'](function (reason) {
            reject(reason);
          });
        })['catch'](function (reason) {
          reject(reason);
        });
      });
    },

    clearAndPlaySingle: function clearAndPlaySingle(uri) {
      var _this6 = this;

      return this.clearTracklist().then(function () {
        return _this6.addTrack(uri).then(function () {
          return _this6.play();
        });
      });
    },

    playTrack: function playTrack(tlid) {
      return this._call('playback', 'play', { tlid: tlid });
    },

    addTrack: function addTrack(uri) {
      return this.addTracks([uri]);
    },

    addTracks: function addTracks(uris) {
      return this._call('tracklist', 'add', { uris: uris });
    },

    removeTrack: function removeTrack(uri) {
      return this.removeTracks([uri]);
    },

    removeTracks: function removeTracks(uris) {
      return this._call('tracklist', 'remove', { uri: uris });
    },

    getTracklist: function getTracklist() {
      return this._call('tracklist', 'getTlTracks');
    },

    clearTracklist: function clearTracklist() {
      return this._call('tracklist', 'clear');
    },

    play: function play() {
      return this._call('playback', 'play');
    },

    pause: function pause() {
      return this._call('playback', 'pause');
    },

    previous: function previous() {
      return this._call('playback', 'previous');
    },

    next: function next() {
      return this._call('playback', 'next');
    },

    stop: function stop() {
      return this._call('playback', 'stop');
    },

    togglePlayPause: function togglePlayPause() {
      var isPlaying = this.get('isPlaying');
      if (isPlaying) {
        return this.pause();
      } else {
        return this.play();
      }
    },

    seek: function seek(position) {
      return this._call('playback', 'seek', { time_position: position });
    },

    getPlaylists: function getPlaylists() {
      var _this7 = this;

      return this._call('playlists', 'getPlaylists').then(function (data) {
        var promiseArray = [];

        _.forEach(data, function (item) {
          var tracks = item['tracks'];
          if (tracks && tracks.length > 0) {
            (function () {
              var uri = tracks[0]['uri'];
              var result = _this7.getImages([uri]).then(function (response) {
                item['images'] = response[uri];
                return item;
              });
              promiseArray.push(result);
            })();
          }
        });

        return _ember['default'].RSVP.all(promiseArray);
      });
    },

    getPlaylist: function getPlaylist(uri) {
      return this._call('playlists', 'lookup', { uri: uri });
    },

    getAlbum: function getAlbum(uri) {
      var _this8 = this;

      return this.lookup(uri).then(function (data) {
        var albumObject = {};

        albumObject['album'] = data[0]['album'];
        albumObject['tracks'] = data;

        return _this8.getImages([uri]).then(function (response) {
          albumObject['album']['images'] = response[uri];
          return albumObject;
        });
      });
    },

    lookup: function lookup(uri) {
      return this._call('library', 'lookup', { uri: uri });
    },

    getRandom: function getRandom() {
      return this._call('tracklist', 'getRandom');
    },

    getRepeat: function getRepeat() {
      return this._call('tracklist', 'getRepeat');
    },

    setRandom: function setRandom(value) {
      return this._call('tracklist', 'setRandom', { value: value });
    },

    setRepeat: function setRepeat(value) {
      return this._call('tracklist', 'setRepeat', { value: value });
    },

    getImages: function getImages(uris) {
      return this._call('library', 'getImages', { uris: uris });
    },

    getVolume: function getVolume() {
      return this._call('mixer', 'getVolume');
    },

    setVolume: function setVolume(volume) {
      return this._call('mixer', 'setVolume', { volume: volume });
    },

    getMute: function getMute() {
      return this._call('mixer', 'getMute');
    },

    setMute: function setMute(state) {
      return this._call('mixer', 'setMute', { mute: state });
    },

    toggleMute: function toggleMute() {
      var muteState = this.get('isMute');
      return this.setMute(!muteState);
    },

    search: function search(query) {
      return this._call('library', 'search', { any: [query] }).then(function (result) {
        return result;
      });
    }
  });
});
define('mopidy-fire/services/title-service', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({
    suffix: 'Mopidy Fire',
    separator: ' | ',
    setTitle: function setTitle(value) {
      var title = value ? value.trim() : value;
      var suffix = this.get('suffix');
      var separator = this.get('separator');
      if (title !== '' && title !== null && title !== undefined) {
        document.title = title + separator + suffix;
      } else {
        document.title = suffix;
      }
    }
  });
});
define("mopidy-fire/templates/album", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "mopidy-fire/templates/album.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" (");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(")\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["content", "model.album.name", ["loc", [null, [2, 2], [2, 22]]], 0, 0, 0, 0], ["content", "model.album.date", ["loc", [null, [2, 24], [2, 44]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 4
            },
            "end": {
              "line": 23,
              "column": 4
            }
          },
          "moduleName": "mopidy-fire/templates/album.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "mf-track", [], ["track", ["subexpr", "@mut", [["get", "track", ["loc", [null, [22, 23], [22, 28]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [22, 6], [22, 30]]], 0, 0]],
        locals: ["track"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/album.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-header__cover");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "class", "section-header__cover-image");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "section-header__cover-overlay");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" (");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(")\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "section-header__cover-artist");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-body");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "type", "button");
        dom.setAttribute(el3, "class", "button");
        var el4 = dom.createTextNode("Play album");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "type", "button");
        dom.setAttribute(el3, "class", "button");
        var el4 = dom.createTextNode("Add to queue");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(fragment, [4]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element4, [3]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element1, 'src');
        morphs[2] = dom.createMorphAt(element2, 1, 1);
        morphs[3] = dom.createMorphAt(element2, 3, 3);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [5]), 1, 1);
        morphs[5] = dom.createElementMorph(element5);
        morphs[6] = dom.createElementMorph(element6);
        morphs[7] = dom.createMorphAt(dom.childAt(element3, [3]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "ember-wormhole", [], ["to", "header-content"], 0, null, ["loc", [null, [1, 0], [3, 19]]]], ["attribute", "src", ["get", "model.album.images.0.uri", ["loc", [null, [6, 13], [6, 37]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "model.album.name", ["loc", [null, [8, 4], [8, 24]]], 0, 0, 0, 0], ["content", "model.album.date", ["loc", [null, [8, 26], [8, 46]]], 0, 0, 0, 0], ["content", "model.album.artists.0.name", ["loc", [null, [10, 6], [10, 36]]], 0, 0, 0, 0], ["element", "action", ["play"], [], ["loc", [null, [17, 41], [17, 58]]], 0, 0], ["element", "action", ["add"], [], ["loc", [null, [18, 41], [18, 57]]], 0, 0], ["block", "each", [["get", "model.tracks", ["loc", [null, [21, 12], [21, 24]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [21, 4], [23, 13]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mopidy-fire/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 4
            },
            "end": {
              "line": 13,
              "column": 4
            }
          },
          "moduleName": "mopidy-fire/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      Connected\n");
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
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 4
            },
            "end": {
              "line": 15,
              "column": 4
            }
          },
          "moduleName": "mopidy-fire/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      Not connected\n");
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
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 37
            },
            "end": {
              "line": 26,
              "column": 91
            }
          },
          "moduleName": "mopidy-fire/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Queue");
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
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 37
            },
            "end": {
              "line": 27,
              "column": 99
            }
          },
          "moduleName": "mopidy-fire/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Playlists");
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
    var child4 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 37
            },
            "end": {
              "line": 28,
              "column": 93
            }
          },
          "moduleName": "mopidy-fire/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Search");
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
    var child5 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 37
            },
            "end": {
              "line": 29,
              "column": 97
            }
          },
          "moduleName": "mopidy-fire/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Settings");
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
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 13
          }
        },
        "moduleName": "mopidy-fire/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        dom.setAttribute(el1, "class", "header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "header__menu-toggle");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "fa fa-bars");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    MENU\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "header-content");
        dom.setAttribute(el2, "class", "header__content");
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "header__connection");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "body");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "loader");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "src", "assets/images/loading.gif");
        dom.setAttribute(el3, "class", "loader__image");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "sidebar open");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "sidebar__menu");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "sidebar__menu-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "sidebar__menu-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "sidebar__menu-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "sidebar__menu-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "content partial");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(fragment, [2]);
        var element3 = dom.childAt(element2, [3, 1]);
        var morphs = new Array(8);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element3, [3]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [5]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element3, [7]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element2, [5]), 1, 1);
        morphs[7] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["element", "action", ["toggleMenu"], [], ["loc", [null, [2, 38], [2, 61]]], 0, 0], ["block", "if", [["get", "mopidy.isConnected", ["loc", [null, [11, 10], [11, 28]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [11, 4], [15, 11]]]], ["block", "link-to", ["queue"], ["class", "sidebar__menu-link"], 2, null, ["loc", [null, [26, 37], [26, 91]]]], ["block", "link-to", ["playlists"], ["class", "sidebar__menu-link"], 3, null, ["loc", [null, [27, 37], [27, 99]]]], ["block", "link-to", ["search"], ["class", "sidebar__menu-link"], 4, null, ["loc", [null, [28, 37], [28, 93]]]], ["block", "link-to", ["settings"], ["class", "sidebar__menu-link"], 5, null, ["loc", [null, [29, 37], [29, 97]]]], ["content", "outlet", ["loc", [null, [34, 4], [34, 14]]], 0, 0, 0, 0], ["content", "mf-player", ["loc", [null, [38, 0], [38, 13]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  })());
});
define("mopidy-fire/templates/artist", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "mopidy-fire/templates/artist.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "model.artist.name", ["loc", [null, [2, 2], [2, 23]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 17,
                "column": 8
              },
              "end": {
                "line": 19,
                "column": 8
              }
            },
            "moduleName": "mopidy-fire/templates/artist.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "mf-playlist-tile", [], ["playlist", ["subexpr", "@mut", [["get", "album", ["loc", [null, [18, 38], [18, 43]]], 0, 0, 0, 0]], [], [], 0, 0], "linkType", "album"], ["loc", [null, [18, 10], [18, 62]]], 0, 0]],
          locals: ["album"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 2
            },
            "end": {
              "line": 22,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/artist.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "artist__album-container");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          dom.setAttribute(el2, "class", "artist__album-header");
          var el3 = dom.createTextNode("Albums");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "row playlist-tiles");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.albums", ["loc", [null, [17, 16], [17, 28]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [17, 8], [19, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 28,
                "column": 8
              },
              "end": {
                "line": 30,
                "column": 8
              }
            },
            "moduleName": "mopidy-fire/templates/artist.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "mf-playlist-tile", [], ["playlist", ["subexpr", "@mut", [["get", "album", ["loc", [null, [29, 38], [29, 43]]], 0, 0, 0, 0]], [], [], 0, 0], "linkType", "album"], ["loc", [null, [29, 10], [29, 62]]], 0, 0]],
          locals: ["album"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 2
            },
            "end": {
              "line": 33,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/artist.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "artist__album-container");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          dom.setAttribute(el2, "class", "artist__album-header");
          var el3 = dom.createTextNode("Singles");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "row playlist-tiles");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.singles", ["loc", [null, [28, 16], [28, 29]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [28, 8], [30, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 40,
                "column": 8
              },
              "end": {
                "line": 42,
                "column": 8
              }
            },
            "moduleName": "mopidy-fire/templates/artist.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "mf-playlist-tile", [], ["playlist", ["subexpr", "@mut", [["get", "album", ["loc", [null, [41, 38], [41, 43]]], 0, 0, 0, 0]], [], [], 0, 0], "linkType", "album"], ["loc", [null, [41, 10], [41, 62]]], 0, 0]],
          locals: ["album"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 36,
              "column": 2
            },
            "end": {
              "line": 45,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/artist.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "artist__album-container");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          dom.setAttribute(el2, "class", "artist__album-header");
          var el3 = dom.createTextNode("Appears on");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "row playlist-tiles");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.appearsOn", ["loc", [null, [40, 16], [40, 31]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [40, 8], [42, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 46,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/artist.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-header__cover");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "class", "section-header__cover-image");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "section-header__cover-overlay");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-body");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(fragment, [4]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element1, 'src');
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(element2, 1, 1);
        morphs[4] = dom.createMorphAt(element2, 3, 3);
        morphs[5] = dom.createMorphAt(element2, 5, 5);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "ember-wormhole", [], ["to", "header-content"], 0, null, ["loc", [null, [1, 0], [3, 19]]]], ["attribute", "src", ["get", "model.artist.images.0.uri", ["loc", [null, [6, 13], [6, 38]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "model.artist.name", ["loc", [null, [8, 4], [8, 25]]], 0, 0, 0, 0], ["block", "if", [["get", "model.albums", ["loc", [null, [13, 8], [13, 20]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [13, 2], [22, 9]]]], ["block", "if", [["get", "model.singles", ["loc", [null, [24, 8], [24, 21]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [24, 2], [33, 9]]]], ["block", "if", [["get", "model.appearsOn", ["loc", [null, [36, 8], [36, 23]]], 0, 0, 0, 0]], [], 3, null, ["loc", [null, [36, 2], [45, 9]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("mopidy-fire/templates/components/mf-album", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.8.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 5,
                  "column": 60
                },
                "end": {
                  "line": 5,
                  "column": 93
                }
              },
              "moduleName": "mopidy-fire/templates/components/mf-album.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode(" ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["content", "album.date", ["loc", [null, [5, 79], [5, 93]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 18
              },
              "end": {
                "line": 6,
                "column": 6
              }
            },
            "moduleName": "mopidy-fire/templates/components/mf-album.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode(" (");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(")\n      ");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
            return morphs;
          },
          statements: [["content", "album.artists.0.name", ["loc", [null, [5, 36], [5, 60]]], 0, 0, 0, 0], ["block", "if", [["get", "album.date", ["loc", [null, [5, 66], [5, 76]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [5, 60], [5, 100]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.8.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 6,
                  "column": 6
                },
                "end": {
                  "line": 7,
                  "column": 4
                }
              },
              "moduleName": "mopidy-fire/templates/components/mf-album.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode(" (");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(")\n    ");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["content", "album.date", ["loc", [null, [6, 30], [6, 44]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 6
              },
              "end": {
                "line": 7,
                "column": 4
              }
            },
            "moduleName": "mopidy-fire/templates/components/mf-album.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
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
          statements: [["block", "if", [["get", "album.date", ["loc", [null, [6, 16], [6, 26]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [6, 6], [7, 4]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 2
              },
              "end": {
                "line": 17,
                "column": 2
              }
            },
            "moduleName": "mopidy-fire/templates/components/mf-album.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("ul");
            dom.setAttribute(el1, "class", "context-menu__list");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("li");
            dom.setAttribute(el2, "class", "context-menu__list-item");
            var el3 = dom.createTextNode("Play album");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("hr");
            dom.setAttribute(el2, "class", "context-menu__separator");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("li");
            dom.setAttribute(el2, "class", "context-menu__list-item");
            var el3 = dom.createTextNode("Add to queue");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(element0, [1]);
            var element2 = dom.childAt(element0, [5]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element1);
            morphs[1] = dom.createElementMorph(element2);
            return morphs;
          },
          statements: [["element", "action", ["handle", "play"], ["target", ["get", "component", ["loc", [null, [13, 74], [13, 83]]], 0, 0, 0, 0]], ["loc", [null, [13, 42], [13, 85]]], 0, 0], ["element", "action", ["handle", "add"], ["target", ["get", "component", ["loc", [null, [15, 73], [15, 82]]], 0, 0, 0, 0]], ["loc", [null, [15, 42], [15, 84]]], 0, 0]],
          locals: ["component"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 19,
              "column": 0
            }
          },
          "moduleName": "mopidy-fire/templates/components/mf-album.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "album__cover");
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "album__image");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "album__name");
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [0]);
          var element4 = dom.childAt(element3, [1]);
          var element5 = dom.childAt(element3, [3]);
          var morphs = new Array(6);
          morphs[0] = dom.createAttrMorph(element4, 'style');
          morphs[1] = dom.createAttrMorph(element4, 'data-image');
          morphs[2] = dom.createAttrMorph(element5, 'title');
          morphs[3] = dom.createMorphAt(element5, 1, 1);
          morphs[4] = dom.createMorphAt(element5, 2, 2);
          morphs[5] = dom.createMorphAt(element3, 5, 5);
          return morphs;
        },
        statements: [["attribute", "style", ["get", "backgroundImage", ["loc", [null, [3, 36], [3, 51]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "data-image", ["concat", [["get", "images.2.uri", ["loc", [null, [3, 68], [3, 80]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "title", ["concat", [["get", "album.name", ["loc", [null, [4, 36], [4, 46]]], 0, 0, 0, 0], " (", ["get", "album.artists.0.name", ["loc", [null, [4, 52], [4, 72]]], 0, 0, 0, 0], " ", ["get", "album.date", ["loc", [null, [4, 77], [4, 87]]], 0, 0, 0, 0], ")"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["content", "album.name", ["loc", [null, [5, 4], [5, 18]]], 0, 0, 0, 0], ["block", "if", [["get", "listView", ["loc", [null, [5, 24], [5, 32]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [5, 18], [7, 11]]]], ["block", "mf-context-menu", [], ["tagName", "i", "class", "fa fa-ellipsis-h album__context-menu", "play", ["subexpr", "action", ["play"], [], ["loc", [null, [10, 9], [10, 24]]], 0, 0], "add", ["subexpr", "action", ["add"], [], ["loc", [null, [10, 29], [10, 43]]], 0, 0]], 2, null, ["loc", [null, [9, 2], [17, 22]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 22,
                "column": 2
              },
              "end": {
                "line": 24,
                "column": 2
              }
            },
            "moduleName": "mopidy-fire/templates/components/mf-album.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "mf-track", [], ["track", ["subexpr", "@mut", [["get", "track", ["loc", [null, [23, 21], [23, 26]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [23, 4], [23, 28]]], 0, 0]],
          locals: ["track"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 0
            },
            "end": {
              "line": 25,
              "column": 0
            }
          },
          "moduleName": "mopidy-fire/templates/components/mf-album.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "each", [["get", "tracks", ["loc", [null, [22, 10], [22, 16]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [22, 2], [24, 11]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
            "column": 0
          }
        },
        "moduleName": "mopidy-fire/templates/components/mf-album.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "link-to", ["album", ["get", "album.uri", ["loc", [null, [1, 19], [1, 28]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [19, 12]]]], ["block", "unless", [["get", "listView", ["loc", [null, [21, 10], [21, 18]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [21, 0], [25, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mopidy-fire/templates/components/mf-artist", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/components/mf-artist.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "artist__image");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "artist__name");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'style');
        morphs[1] = dom.createAttrMorph(element0, 'data-image');
        morphs[2] = dom.createAttrMorph(element1, 'title');
        morphs[3] = dom.createMorphAt(element1, 1, 1);
        return morphs;
      },
      statements: [["attribute", "style", ["get", "backgroundImage", ["loc", [null, [1, 35], [1, 50]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "data-image", ["concat", [["get", "images.2.uri", ["loc", [null, [1, 67], [1, 79]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "title", ["concat", [["get", "artist.name", ["loc", [null, [3, 35], [3, 46]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["content", "artist.name", ["loc", [null, [4, 2], [4, 17]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("mopidy-fire/templates/components/mf-context-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/components/mf-context-menu.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["context-menu__content ", ["subexpr", "if", [["get", "isOpen", ["loc", [null, [1, 39], [1, 45]]], 0, 0, 0, 0], "open"], [], ["loc", [null, [1, 34], [1, 54]]], 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["inline", "yield", [["get", "this", ["loc", [null, [2, 10], [2, 14]]], 0, 0, 0, 0]], [], ["loc", [null, [2, 2], [2, 16]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("mopidy-fire/templates/components/mf-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "mopidy-fire/templates/components/mf-input.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("mopidy-fire/templates/components/mf-player", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/components/mf-player.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "footer__track-title");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" -\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "footer__track-artist");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 0, 0);
          return morphs;
        },
        statements: [["content", "currentTrack.name", ["loc", [null, [3, 38], [3, 59]]], 0, 0, 0, 0], ["content", "currentTrack.artists.firstObject.name", ["loc", [null, [4, 39], [4, 80]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 40,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/components/mf-player.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "footer__track");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row footer__controls");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "footer__center small-12 medium-2 large-2");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "control");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "control__icon fa fa-step-backward");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "control");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "control");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "control__icon fa fa-step-forward");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "footer__center small-12 medium-10 large-7");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "footer__time");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "footer__time");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "footer__center small-12 large-3");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "control__icon fa fa-random");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "control__icon fa fa-repeat");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element1, [5]);
        var element6 = dom.childAt(element0, [3]);
        var element7 = dom.childAt(element0, [5]);
        var element8 = dom.childAt(element7, [1]);
        var element9 = dom.childAt(element7, [3]);
        var morphs = new Array(13);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createAttrMorph(element4, 'class');
        morphs[4] = dom.createElementMorph(element5);
        morphs[5] = dom.createMorphAt(dom.childAt(element6, [1]), 1, 1);
        morphs[6] = dom.createMorphAt(element6, 3, 3);
        morphs[7] = dom.createMorphAt(dom.childAt(element6, [5]), 1, 1);
        morphs[8] = dom.createAttrMorph(element8, 'class');
        morphs[9] = dom.createElementMorph(element8);
        morphs[10] = dom.createAttrMorph(element9, 'class');
        morphs[11] = dom.createElementMorph(element9);
        morphs[12] = dom.createMorphAt(element7, 5, 5);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasTrack", ["loc", [null, [2, 8], [2, 16]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [5, 9]]]], ["element", "action", ["previous"], [], ["loc", [null, [10, 28], [10, 49]]], 0, 0], ["element", "action", ["togglePlayPause"], [], ["loc", [null, [13, 28], [13, 56]]], 0, 0], ["attribute", "class", ["concat", ["control__icon fa ", ["subexpr", "if", [["get", "isPlaying", ["loc", [null, [14, 38], [14, 47]]], 0, 0, 0, 0], "fa-pause", "fa-play"], [], ["loc", [null, [14, 33], [14, 70]]], 0, 0], " control__icon--playpause"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["next"], [], ["loc", [null, [16, 28], [16, 45]]], 0, 0], ["inline", "format-duration", [["get", "currentProgress", ["loc", [null, [22, 24], [22, 39]]], 0, 0, 0, 0]], [], ["loc", [null, [22, 6], [22, 41]]], 0, 0], ["inline", "mf-slider", [], ["currentPosition", ["subexpr", "@mut", [["get", "currentProgressPercent", ["loc", [null, [25, 32], [25, 54]]], 0, 0, 0, 0]], [], [], 0, 0], "onMouseUp", ["subexpr", "action", ["setProgress"], [], ["loc", [null, [25, 65], [25, 87]]], 0, 0]], ["loc", [null, [25, 4], [25, 89]]], 0, 0], ["inline", "format-duration", [["subexpr", "if", [["get", "hasTrack", ["loc", [null, [28, 28], [28, 36]]], 0, 0, 0, 0], ["get", "currentTrack.length", ["loc", [null, [28, 37], [28, 56]]], 0, 0, 0, 0], 0], [], ["loc", [null, [28, 24], [28, 59]]], 0, 0]], [], ["loc", [null, [28, 6], [28, 61]]], 0, 0], ["attribute", "class", ["concat", ["control ", ["subexpr", "unless", [["get", "isRandom", ["loc", [null, [32, 36], [32, 44]]], 0, 0, 0, 0], "inactive"], [], ["loc", [null, [32, 27], [32, 57]]], 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["random"], [], ["loc", [null, [32, 59], [32, 78]]], 0, 0], ["attribute", "class", ["concat", ["control ", ["subexpr", "unless", [["get", "isRepeat", ["loc", [null, [35, 36], [35, 44]]], 0, 0, 0, 0], "inactive"], [], ["loc", [null, [35, 27], [35, 57]]], 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["repeat"], [], ["loc", [null, [35, 59], [35, 78]]], 0, 0], ["content", "mf-volume-control", ["loc", [null, [38, 4], [38, 25]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mopidy-fire/templates/components/mf-playlist-tile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 4
              },
              "end": {
                "line": 15,
                "column": 4
              }
            },
            "moduleName": "mopidy-fire/templates/components/mf-playlist-tile.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("ul");
            dom.setAttribute(el1, "class", "context-menu__list");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("li");
            dom.setAttribute(el2, "class", "context-menu__list-item");
            var el3 = dom.createTextNode("Play");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("hr");
            dom.setAttribute(el2, "class", "context-menu__separator");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("li");
            dom.setAttribute(el2, "class", "context-menu__list-item");
            var el3 = dom.createTextNode("Add to queue");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(element0, [1]);
            var element2 = dom.childAt(element0, [5]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element1);
            morphs[1] = dom.createElementMorph(element2);
            return morphs;
          },
          statements: [["element", "action", ["handle", "play"], ["target", ["get", "component", ["loc", [null, [11, 76], [11, 85]]], 0, 0, 0, 0]], ["loc", [null, [11, 44], [11, 87]]], 0, 0], ["element", "action", ["handle", "add"], ["target", ["get", "component", ["loc", [null, [13, 75], [13, 84]]], 0, 0, 0, 0]], ["loc", [null, [13, 44], [13, 86]]], 0, 0]],
          locals: ["component"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 20,
              "column": 0
            }
          },
          "moduleName": "mopidy-fire/templates/components/mf-playlist-tile.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "playlist-tile__cover");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "playlist-tile__cover-overlay");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2, "class", "playlist-tile__cover-image");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "playlist-tile__title");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "playlist-tile__subtitle");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" track");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var element4 = dom.childAt(element3, [3]);
          var element5 = dom.childAt(fragment, [5]);
          var morphs = new Array(5);
          morphs[0] = dom.createAttrMorph(element4, 'src');
          morphs[1] = dom.createMorphAt(element3, 5, 5);
          morphs[2] = dom.createMorphAt(dom.childAt(fragment, [3]), 0, 0);
          morphs[3] = dom.createMorphAt(element5, 0, 0);
          morphs[4] = dom.createMorphAt(element5, 2, 2);
          return morphs;
        },
        statements: [["attribute", "src", ["get", "playlist.images.1.uri", ["loc", [null, [4, 15], [4, 36]]], 0, 0, 0, 0], 0, 0, 0, 0], ["block", "mf-context-menu", [], ["tagName", "i", "class", "fa fa-ellipsis-h playlist-tile__context-menu", "play", ["subexpr", "action", ["play"], [], ["loc", [null, [7, 11], [7, 26]]], 0, 0], "add", ["subexpr", "action", ["add"], [], ["loc", [null, [7, 31], [7, 45]]], 0, 0], "attachTo", ".content"], 0, null, ["loc", [null, [6, 4], [15, 24]]]], ["content", "playlist.name", ["loc", [null, [18, 36], [18, 53]]], 0, 0, 0, 0], ["content", "trackCount", ["loc", [null, [19, 39], [19, 53]]], 0, 0, 0, 0], ["inline", "if", [["get", "tracksPlural", ["loc", [null, [19, 64], [19, 76]]], 0, 0, 0, 0], "s"], [], ["loc", [null, [19, 59], [19, 82]]], 0, 0]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 12
          }
        },
        "moduleName": "mopidy-fire/templates/components/mf-playlist-tile.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["block", "link-to", [["get", "linkType", ["loc", [null, [1, 11], [1, 19]]], 0, 0, 0, 0], ["get", "playlist.uri", ["loc", [null, [1, 20], [1, 32]]], 0, 0, 0, 0]], ["class", "playlist-tile__link"], 0, null, ["loc", [null, [1, 0], [20, 12]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mopidy-fire/templates/components/mf-slider", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "mopidy-fire/templates/components/mf-slider.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "slider__bar");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "slider__bar-current");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(1);
        morphs[0] = dom.createAttrMorph(element0, 'style');
        return morphs;
      },
      statements: [["attribute", "style", ["get", "sliderWidth", ["loc", [null, [2, 43], [2, 54]]], 0, 0, 0, 0], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("mopidy-fire/templates/components/mf-track", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 7,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/components/mf-track.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "track.artists.firstObject.name", ["loc", [null, [6, 4], [6, 38]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/components/mf-track.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "track.album.name", ["loc", [null, [11, 4], [11, 24]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 0
            },
            "end": {
              "line": 27,
              "column": 0
            }
          },
          "moduleName": "mopidy-fire/templates/components/mf-track.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1, "class", "context-menu__list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2, "class", "context-menu__list-item");
          var el3 = dom.createTextNode("Play");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("hr");
          dom.setAttribute(el2, "class", "context-menu__separator");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2, "class", "context-menu__list-item");
          var el3 = dom.createTextNode("Add to queue");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2, "class", "context-menu__list-item");
          var el3 = dom.createTextNode("Remove from queue");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [5]);
          var element3 = dom.childAt(element0, [7]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createElementMorph(element2);
          morphs[2] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [["element", "action", ["handle", "play"], ["target", ["get", "component", ["loc", [null, [22, 72], [22, 81]]], 0, 0, 0, 0]], ["loc", [null, [22, 40], [22, 83]]], 0, 0], ["element", "action", ["handle", "add"], ["target", ["get", "component", ["loc", [null, [24, 71], [24, 80]]], 0, 0, 0, 0]], ["loc", [null, [24, 40], [24, 82]]], 0, 0], ["element", "action", ["handle", "remove"], ["target", ["get", "component", ["loc", [null, [25, 74], [25, 83]]], 0, 0, 0, 0]], ["loc", [null, [25, 40], [25, 85]]], 0, 0]],
        locals: ["component"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/components/mf-track.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "small-12 medium-4 column track__title");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "small-5 medium-3 column track__artist");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "small-5 medium-3 column track__album");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "small-1 medium-1 column track__duration");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "small-1 column track__context-menu");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [6]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        return morphs;
      },
      statements: [["content", "track.name", ["loc", [null, [2, 2], [2, 16]]], 0, 0, 0, 0], ["block", "link-to", ["artist", ["get", "track.artists.firstObject.uri", ["loc", [null, [5, 22], [5, 51]]], 0, 0, 0, 0]], ["title", ["subexpr", "@mut", [["get", "track.artists.firstObject.name", ["loc", [null, [5, 58], [5, 88]]], 0, 0, 0, 0]], [], [], 0, 0]], 0, null, ["loc", [null, [5, 2], [7, 14]]]], ["block", "link-to", ["album", ["get", "track.album.uri", ["loc", [null, [10, 21], [10, 36]]], 0, 0, 0, 0]], ["title", ["subexpr", "@mut", [["get", "track.album.name", ["loc", [null, [10, 43], [10, 59]]], 0, 0, 0, 0]], [], [], 0, 0]], 1, null, ["loc", [null, [10, 2], [12, 14]]]], ["inline", "format-duration", [["get", "track.length", ["loc", [null, [15, 20], [15, 32]]], 0, 0, 0, 0]], [], ["loc", [null, [15, 2], [15, 34]]], 0, 0], ["block", "mf-context-menu", [], ["tagName", "i", "class", "fa fa-ellipsis-h", "play", ["subexpr", "action", ["play"], [], ["loc", [null, [19, 7], [19, 22]]], 0, 0], "add", ["subexpr", "action", ["add"], [], ["loc", [null, [19, 27], [19, 41]]], 0, 0], "remove", ["subexpr", "action", ["remove"], [], ["loc", [null, [19, 49], [19, 66]]], 0, 0]], 2, null, ["loc", [null, [18, 0], [27, 20]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("mopidy-fire/templates/components/mf-volume-control", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 67
          }
        },
        "moduleName": "mopidy-fire/templates/components/mf-volume-control.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "class", "control");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createAttrMorph(element1, 'class');
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["element", "action", ["toggleMute"], [], ["loc", [null, [1, 24], [1, 47]]], 0, 0], ["attribute", "class", ["concat", ["control__icon fa ", ["subexpr", "if", [["get", "isMute", ["loc", [null, [2, 34], [2, 40]]], 0, 0, 0, 0], "fa-volume-off", "fa-volume-up"], [], ["loc", [null, [2, 29], [2, 73]]], 0, 0], " control__icon--volume"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["inline", "mf-slider", [], ["currentPosition", ["subexpr", "@mut", [["get", "volume", ["loc", [null, [5, 28], [5, 34]]], 0, 0, 0, 0]], [], [], 0, 0], "onMouseUp", ["subexpr", "action", ["setVolume"], [], ["loc", [null, [5, 45], [5, 65]]], 0, 0]], ["loc", [null, [5, 0], [5, 67]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("mopidy-fire/templates/error", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 4
            },
            "end": {
              "line": 6,
              "column": 4
            }
          },
          "moduleName": "mopidy-fire/templates/error.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(": ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element0, 0, 0);
          morphs[1] = dom.createMorphAt(element0, 2, 2);
          return morphs;
        },
        statements: [["content", "error.name", ["loc", [null, [5, 9], [5, 23]]], 0, 0, 0, 0], ["content", "error.message", ["loc", [null, [5, 25], [5, 42]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/error.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row section-body");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "column");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Mopidy Fire encountered an error.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 3, 3);
        return morphs;
      },
      statements: [["block", "if", [["get", "error", ["loc", [null, [4, 10], [4, 15]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [4, 4], [6, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mopidy-fire/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row section-body");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "column");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Mopidy Fire");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Welcome to Mopidy Fire - an Ember.js-based web interface for the popular mopidy music player.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
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
  })());
});
define("mopidy-fire/templates/playlist", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "mopidy-fire/templates/playlist.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "model.name", ["loc", [null, [2, 2], [2, 16]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 4
            },
            "end": {
              "line": 16,
              "column": 4
            }
          },
          "moduleName": "mopidy-fire/templates/playlist.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "mf-track", [], ["track", ["subexpr", "@mut", [["get", "track", ["loc", [null, [15, 23], [15, 28]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [15, 6], [15, 30]]], 0, 0]],
        locals: ["track"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/playlist.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-header__cover");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "class", "section-header__cover-image");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "section-header__cover-overlay");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-body");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element1, 'src');
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [4, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "ember-wormhole", [], ["to", "header-content"], 0, null, ["loc", [null, [1, 0], [3, 19]]]], ["attribute", "src", ["get", "image", ["loc", [null, [6, 13], [6, 18]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "model.name", ["loc", [null, [8, 4], [8, 18]]], 0, 0, 0, 0], ["block", "each", [["get", "model.tracks", ["loc", [null, [14, 12], [14, 24]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [14, 4], [16, 13]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mopidy-fire/templates/playlists", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/playlists.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "mf-playlist-tile", [], ["playlist", ["subexpr", "@mut", [["get", "playlist", ["loc", [null, [3, 32], [3, 40]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [3, 4], [3, 42]]], 0, 0]],
        locals: ["playlist"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 2
            },
            "end": {
              "line": 6,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/playlists.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h3");
          dom.setAttribute(el1, "class", "text-center");
          var el2 = dom.createTextNode("No playlists found");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/playlists.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row section-body playlist-tiles");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [2, 10], [2, 15]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [2, 2], [6, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mopidy-fire/templates/queue", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/queue.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "mf-track", [], ["track", ["subexpr", "@mut", [["get", "tltrack.track", ["loc", [null, [3, 21], [3, 34]]], 0, 0, 0, 0]], [], [], 0, 0], "tlid", ["subexpr", "@mut", [["get", "tltrack.tlid", ["loc", [null, [3, 40], [3, 52]]], 0, 0, 0, 0]], [], [], 0, 0], "isQueue", true], ["loc", [null, [3, 4], [3, 67]]], 0, 0]],
        locals: ["tltrack"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 2
            },
            "end": {
              "line": 6,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/queue.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h3");
          dom.setAttribute(el1, "class", "text-center");
          var el2 = dom.createTextNode("Queue is empty");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/queue.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-body");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [2, 10], [2, 15]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [2, 2], [6, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mopidy-fire/templates/search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.8.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 16,
                    "column": 14
                  },
                  "end": {
                    "line": 18,
                    "column": 14
                  }
                },
                "moduleName": "mopidy-fire/templates/search.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["inline", "mf-artist", [], ["artist", ["subexpr", "@mut", [["get", "artist", ["loc", [null, [17, 35], [17, 41]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [17, 16], [17, 43]]], 0, 0]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@2.8.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 15,
                  "column": 12
                },
                "end": {
                  "line": 19,
                  "column": 12
                }
              },
              "moduleName": "mopidy-fire/templates/search.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
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
            statements: [["block", "link-to", ["artist", ["get", "artist.uri", ["loc", [null, [16, 34], [16, 44]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [16, 14], [18, 26]]]]],
            locals: ["artist"],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 21,
                "column": 6
              }
            },
            "moduleName": "mopidy-fire/templates/search.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "search-results__container");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("h3");
            dom.setAttribute(el2, "class", "search-results__header");
            var el3 = dom.createTextNode("Artists");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 3, 3);
            return morphs;
          },
          statements: [["block", "each", [["get", "model.artists", ["loc", [null, [15, 20], [15, 33]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [15, 12], [19, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.8.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 27,
                  "column": 12
                },
                "end": {
                  "line": 29,
                  "column": 12
                }
              },
              "moduleName": "mopidy-fire/templates/search.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "mf-playlist-tile", [], ["playlist", ["subexpr", "@mut", [["get", "album", ["loc", [null, [28, 42], [28, 47]]], 0, 0, 0, 0]], [], [], 0, 0], "linkType", "album"], ["loc", [null, [28, 14], [28, 66]]], 0, 0]],
            locals: ["album"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 6
              },
              "end": {
                "line": 32,
                "column": 6
              }
            },
            "moduleName": "mopidy-fire/templates/search.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "search-results__container");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("h3");
            dom.setAttribute(el2, "class", "search-results__header search-results__header--margined");
            var el3 = dom.createTextNode("Albums");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "row playlist-tiles");
            var el3 = dom.createTextNode("\n");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("          ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["block", "each", [["get", "model.albums", ["loc", [null, [27, 20], [27, 32]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [27, 12], [29, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child2 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.8.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 37,
                  "column": 10
                },
                "end": {
                  "line": 39,
                  "column": 10
                }
              },
              "moduleName": "mopidy-fire/templates/search.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("            ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "mf-track", [], ["track", ["subexpr", "@mut", [["get", "track", ["loc", [null, [38, 29], [38, 34]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [38, 12], [38, 36]]], 0, 0]],
            locals: ["track"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 34,
                "column": 6
              },
              "end": {
                "line": 41,
                "column": 6
              }
            },
            "moduleName": "mopidy-fire/templates/search.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "search-results__container");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("h3");
            dom.setAttribute(el2, "class", "search-results__header");
            var el3 = dom.createTextNode("Tracks");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 3, 3);
            return morphs;
          },
          statements: [["block", "each", [["get", "model.tracks", ["loc", [null, [37, 18], [37, 30]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [37, 10], [39, 19]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 43,
              "column": 2
            }
          },
          "moduleName": "mopidy-fire/templates/search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "search-results");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(element0, 1, 1);
          morphs[1] = dom.createMorphAt(element0, 3, 3);
          morphs[2] = dom.createMorphAt(element0, 5, 5);
          return morphs;
        },
        statements: [["block", "if", [["get", "model.artists", ["loc", [null, [12, 12], [12, 25]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [12, 6], [21, 13]]]], ["block", "if", [["get", "model.albums", ["loc", [null, [23, 12], [23, 24]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [23, 6], [32, 13]]]], ["block", "if", [["get", "model.tracks", ["loc", [null, [34, 12], [34, 24]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [34, 6], [41, 13]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 44,
            "column": 6
          }
        },
        "moduleName": "mopidy-fire/templates/search.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-body");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "input-group");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "input-group-button");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "button");
        dom.setAttribute(el4, "value", "Search");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(element1, 3, 3);
        return morphs;
      },
      statements: [["inline", "mf-input", [], ["class", "input-group-field", "value", ["subexpr", "readonly", [["get", "query", ["loc", [null, [4, 57], [4, 62]]], 0, 0, 0, 0]], [], ["loc", [null, [4, 47], [4, 63]]], 0, 0], "onInput", "onInput", "onSubmit", "onSubmit", "update", ["subexpr", "action", [["subexpr", "mut", [["get", "query", ["loc", [null, [4, 122], [4, 127]]], 0, 0, 0, 0]], [], ["loc", [null, [4, 117], [4, 128]]], 0, 0]], [], ["loc", [null, [4, 109], [4, 129]]], 0, 0]], ["loc", [null, [4, 4], [4, 131]]], 0, 0], ["block", "if", [["get", "model", ["loc", [null, [10, 8], [10, 13]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [10, 2], [43, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mopidy-fire/templates/settings", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "mopidy-fire/templates/settings.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-body");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "small-12 large-6 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Mopidy URL (e.g. localhost:6680)\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "small-12 large-6 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "button");
        dom.setAttribute(el4, "class", "button");
        var el5 = dom.createTextNode("Save");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3, 1, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1, 1]), 1, 1);
        morphs[1] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "mopidyUrl", ["loc", [null, [5, 34], [5, 43]]], 0, 0, 0, 0]], [], [], 0, 0], "placeholder", "localhost:6680"], ["loc", [null, [5, 8], [5, 74]]], 0, 0], ["element", "action", ["save"], [], ["loc", [null, [11, 43], [11, 60]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('mopidy-fire/config/environment', ['ember'], function(Ember) {
  var prefix = 'mopidy-fire';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("mopidy-fire/app")["default"].create({"name":"mopidy-fire","version":"0.0.0+cafedc08"});
}

/* jshint ignore:end */
//# sourceMappingURL=mopidy-fire.map