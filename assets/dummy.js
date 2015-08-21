"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/acceptance-tests/main', ['exports', 'ember-cli-sri/acceptance-tests/main'], function (exports, main) {

	'use strict';



	exports['default'] = main['default'];

});
define('dummy/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dummy/application/controller', ['exports', 'ember', 'dummy/utils/generate-data'], function (exports, Ember, generateData) {

  'use strict';

  // Dummy Application Controller.

  exports['default'] = Ember['default'].Controller.extend({

    gridRows: generateData['default'](500, {
      name: 'name',
      age: { name: 'age', options: { type: 'adult' } },
      salary: { name: 'dollar', options: { max: 200000 } },
      email: { name: 'email', options: { domain: 'example.com' } }
    }, 4359)

  });

});
define('dummy/application/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0-canary+eeed334b",
              "loc": {
                "source": null,
                "start": {
                  "line": 8,
                  "column": 4
                },
                "end": {
                  "line": 10,
                  "column": 4
                }
              },
              "moduleName": "dummy/application/template.hbs"
            },
            isEmpty: false,
            arity: 3,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      [");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(":");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("] ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("strong");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(3);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
              morphs[2] = dom.createMorphAt(dom.childAt(fragment, [5]),0,0);
              return morphs;
            },
            statements: [
              ["content","rowIndex",["loc",[null,[9,7],[9,19]]]],
              ["content","column.key",["loc",[null,[9,20],[9,34]]]],
              ["content","field",["loc",[null,[9,44],[9,53]]]]
            ],
            locals: ["field","rowIndex","column"],
            templates: []
          };
        }());
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0-canary+eeed334b",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 12,
                "column": 2
              }
            },
            "moduleName": "dummy/application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    \n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            return morphs;
          },
          statements: [
            ["block","eg-body",[],[],0,null,["loc",[null,[8,4],[10,16]]]]
          ],
          locals: [],
          templates: [child0]
        };
      }());
      var child1 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0-canary+eeed334b",
              "loc": {
                "source": null,
                "start": {
                  "line": 18,
                  "column": 4
                },
                "end": {
                  "line": 20,
                  "column": 4
                }
              },
              "moduleName": "dummy/application/template.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("span");
              dom.setAttribute(el1,"style","text-align: right;display: block;");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
              return morphs;
            },
            statements: [
              ["content","column.header",["loc",[null,[19,54],[19,71]]]]
            ],
            locals: ["column"],
            templates: []
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0-canary+eeed334b",
              "loc": {
                "source": null,
                "start": {
                  "line": 21,
                  "column": 4
                },
                "end": {
                  "line": 21,
                  "column": 47
                }
              },
              "moduleName": "dummy/application/template.hbs"
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
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["content","column.header",["loc",[null,[21,30],[21,47]]]]
            ],
            locals: ["column"],
            templates: []
          };
        }());
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0-canary+eeed334b",
            "loc": {
              "source": null,
              "start": {
                "line": 16,
                "column": 2
              },
              "end": {
                "line": 23,
                "column": 2
              }
            },
            "moduleName": "dummy/application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    \n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
            return morphs;
          },
          statements: [
            ["block","eg-header",[],[],0,null,["loc",[null,[18,4],[20,18]]]],
            ["block","eg-footer",[],[],1,null,["loc",[null,[21,4],[21,61]]]]
          ],
          locals: [],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0-canary+eeed334b",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 26,
              "column": 0
            }
          },
          "moduleName": "dummy/application/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
          morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
          morphs[3] = dom.createMorphAt(fragment,7,7,contextualElement);
          return morphs;
        },
        statements: [
          ["block","eg-column",[],["key","name","width",250,"header","Name","footer","Footer text","min-width",150,"max-width",300,"align","center"],0,null,["loc",[null,[4,2],[12,16]]]],
          ["inline","eg-column",[],["key","age","width",50,"footer","Age Footer","resizable",false,"align","center"],["loc",[null,[14,2],[14,85]]]],
          ["block","eg-column",[],["key","salary","width",80,"header","Salary"],1,null,["loc",[null,[16,2],[23,16]]]],
          ["inline","eg-column",[],["key","email","width",150,"header","Email","footer","Email Footer"],["loc",[null,[25,2],[25,74]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes",
            "wrong-type"
          ]
        },
        "revision": "Ember@2.2.0-canary+eeed334b",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 0
          }
        },
        "moduleName": "dummy/application/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"id","title");
        var el2 = dom.createTextNode("Ember Grid");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ember-grid",[],["width",800,"height",200,"rowHeight",25,"data",["subexpr","@mut",[["get","gridRows",["loc",[null,[2,53],[2,61]]]]],[],[]],"showFooter",true],0,null,["loc",[null,[2,0],[26,15]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/components/eg-body', ['exports', 'ember-grid/components/eg-body/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-column', ['exports', 'ember-grid/components/eg-column/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-footer', ['exports', 'ember-grid/components/eg-footer/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-header', ['exports', 'ember-grid/components/eg-header/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-render/eg-body-cell', ['exports', 'ember-grid/components/eg-render/eg-body-cell/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-render/eg-body-row/component', ['exports', 'ember-grid/components/eg-render/eg-body-row/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-render/eg-body', ['exports', 'ember-grid/components/eg-render/eg-body/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-render/eg-footer-cell', ['exports', 'ember-grid/components/eg-render/eg-footer-cell/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-render/eg-footer/component', ['exports', 'ember-grid/components/eg-render/eg-footer/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-render/eg-header-cell', ['exports', 'ember-grid/components/eg-render/eg-header-cell/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-render/eg-header-resize-handle/component', ['exports', 'ember-grid/components/eg-render/eg-header-resize-handle/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/eg-render/eg-header', ['exports', 'ember-grid/components/eg-render/eg-header/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/ember-collection', ['exports', 'ember-collection/components/ember-collection'], function (exports, EmberCollection) {

	'use strict';

	exports['default'] = EmberCollection['default'];

});
define('dummy/components/ember-grid', ['exports', 'ember-grid/components/ember-grid/component'], function (exports, component) {

	'use strict';



	exports['default'] = component['default'];

});
define('dummy/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, ember_wormhole) {

	'use strict';



	exports['default'] = ember_wormhole['default'];

});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dummy/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dummy/dom-util/util', ['exports', 'ember-grid/dom-util/util'], function (exports, util) {

	'use strict';



	exports['default'] = util['default'];

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-body/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-body');
  test('modules/ember-grid/components/eg-body/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-body/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-column/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-column');
  test('modules/ember-grid/components/eg-column/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-column/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-footer/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-footer');
  test('modules/ember-grid/components/eg-footer/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-footer/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-header/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-header');
  test('modules/ember-grid/components/eg-header/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-header/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-render/eg-body-cell/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-render/eg-body-cell');
  test('modules/ember-grid/components/eg-render/eg-body-cell/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-render/eg-body-cell/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-render/eg-body-row/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-render/eg-body-row');
  test('modules/ember-grid/components/eg-render/eg-body-row/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-render/eg-body-row/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-render/eg-body/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-render/eg-body');
  test('modules/ember-grid/components/eg-render/eg-body/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-render/eg-body/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-render/eg-footer-cell/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-render/eg-footer-cell');
  test('modules/ember-grid/components/eg-render/eg-footer-cell/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-render/eg-footer-cell/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-render/eg-footer/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-render/eg-footer');
  test('modules/ember-grid/components/eg-render/eg-footer/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-render/eg-footer/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-render/eg-header-cell/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-render/eg-header-cell');
  test('modules/ember-grid/components/eg-render/eg-header-cell/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-render/eg-header-cell/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-render/eg-header-resize-handle/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-render/eg-header-resize-handle');
  test('modules/ember-grid/components/eg-render/eg-header-resize-handle/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-render/eg-header-resize-handle/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/eg-render/eg-header/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/eg-render/eg-header');
  test('modules/ember-grid/components/eg-render/eg-header/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/eg-render/eg-header/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/components/ember-grid/component.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/components/ember-grid');
  test('modules/ember-grid/components/ember-grid/component.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/components/ember-grid/component.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/eg-column/model.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/eg-column');
  test('modules/ember-grid/eg-column/model.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/eg-column/model.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/helpers/eg-add.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/helpers');
  test('modules/ember-grid/helpers/eg-add.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/helpers/eg-add.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/helpers/eg-cell-data.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/helpers');
  test('modules/ember-grid/helpers/eg-cell-data.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/helpers/eg-cell-data.js should pass jshint.');
  });

});
define('dummy/ember-grid/tests/modules/ember-grid/utils/dom-util.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-grid/utils');
  test('modules/ember-grid/utils/dom-util.js should pass jshint', function () {
    ok(true, 'modules/ember-grid/utils/dom-util.js should pass jshint.');
  });

});
define('dummy/helpers/eg-add', ['exports', 'ember-grid/helpers/eg-add'], function (exports, eg_add) {

	'use strict';



	exports['default'] = eg_add['default'];
	exports.egAdd = eg_add.egAdd;

});
define('dummy/helpers/eg-cell-data', ['exports', 'ember-grid/helpers/eg-cell-data'], function (exports, eg_cell_data) {

	'use strict';



	exports['default'] = eg_cell_data['default'];
	exports.egCellData = eg_cell_data.egCellData;

});
define('dummy/helpers/fixed-grid-layout', ['exports', 'ember', 'ember-collection/layouts/grid'], function (exports, Ember, Grid) {

  'use strict';

  exports['default'] = Ember['default'].Helper.helper(function (params, hash) {
    return new Grid['default'](params[0], params[1]);
  });

});
define('dummy/helpers/mixed-grid-layout', ['exports', 'ember', 'ember-collection/layouts/mixed-grid'], function (exports, Ember, MixedGrid) {

  'use strict';

  exports['default'] = Ember['default'].Helper.helper(function (params, hash) {
    return new MixedGrid['default'](params[0]);
  });

});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
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

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('dummy/instance-initializers/app-version', ['exports', 'dummy/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;

});
define('dummy/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('dummy/tests/application/controller.jshint', function () {

  'use strict';

  module('JSHint - application');
  test('application/controller.js should pass jshint', function() { 
    ok(true, 'application/controller.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/resolver', ['exports', 'ember/resolver', 'dummy/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('dummy/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('dummy/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-body-test', ['ember-qunit', 'dummy/utils/generate-data'], function (ember_qunit, generateData) {

  'use strict';

  ember_qunit.moduleForComponent('eg-body', 'Integration | Component | eg body', {
    integration: true
  });

  var data = generateData['default'](10, {
    name: 'name', birthday: 'birthday'
  }, 34234);

  ember_qunit.test('without required attributes, is blank.', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 11
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
        statements: [['content', 'eg-body', ['loc', [null, [1, 0], [1, 11]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');
  });

  ember_qunit.test('renders slice of cells for data', function (assert) {
    var column = { key: 'name' };
    var offset = 3;
    var limit = 2;
    this.setProperties({ column: column, data: data, offset: offset, limit: limit });
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 61
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
        statements: [['inline', 'eg-body', [], ['column', ['subexpr', '@mut', [['get', 'column', ['loc', [null, [1, 17], [1, 23]]]]], [], []], 'data', ['subexpr', '@mut', [['get', 'data', ['loc', [null, [1, 29], [1, 33]]]]], [], []], 'offset', ['subexpr', '@mut', [['get', 'offset', ['loc', [null, [1, 41], [1, 47]]]]], [], []], 'limit', ['subexpr', '@mut', [['get', 'limit', ['loc', [null, [1, 54], [1, 59]]]]], [], []]], ['loc', [null, [1, 0], [1, 61]]]]],
        locals: [],
        templates: []
      };
    })()));
    assert.equal(this.$().text().trim(), '');
  });

});
define('dummy/tests/integration/components/eg-body-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components');
  test('integration/components/eg-body-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-body-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-column-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-column', 'Integration | Component | eg column', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['content', 'eg-column', ['loc', [null, [1, 0], [1, 13]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-column', [], [], 0, null, ['loc', [null, [2, 4], [4, 18]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-column-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components');
  test('integration/components/eg-column-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-column-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-footer-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-footer', 'Integration | Component | eg footer', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['content', 'eg-footer', ['loc', [null, [1, 0], [1, 13]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-footer', [], [], 0, null, ['loc', [null, [2, 4], [4, 18]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-footer-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components');
  test('integration/components/eg-footer-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-footer-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-header-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-header', 'Integration | Component | eg header', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['content', 'eg-header', ['loc', [null, [1, 0], [1, 13]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-header', [], [], 0, null, ['loc', [null, [2, 4], [4, 18]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-header-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components');
  test('integration/components/eg-header-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-header-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-render/eg-body-cell-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-render/eg-body-cell', 'Integration | Component | eg render/eg body cell', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 26
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
        statements: [['content', 'eg-render/eg-body-cell', ['loc', [null, [1, 0], [1, 26]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-render/eg-body-cell', [], [], 0, null, ['loc', [null, [2, 4], [4, 31]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-render/eg-body-cell-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components/eg-render');
  test('integration/components/eg-render/eg-body-cell-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-render/eg-body-cell-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-render/eg-body-row/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-render/eg-body-row', 'Integration | Component | eg render/eg body row', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 25
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
        statements: [['content', 'eg-render/eg-body-row', ['loc', [null, [1, 0], [1, 25]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-render/eg-body-row', [], [], 0, null, ['loc', [null, [2, 4], [4, 30]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-render/eg-body-row/component-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components/eg-render/eg-body-row');
  test('integration/components/eg-render/eg-body-row/component-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-render/eg-body-row/component-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-render/eg-footer-cell-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-render/eg-footer-cell', 'Integration | Component | eg-render/eg-footer-cell', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 28
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
        statements: [['content', 'eg-render/eg-footer-cell', ['loc', [null, [1, 0], [1, 28]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-render/eg-footer-cell', [], [], 0, null, ['loc', [null, [2, 4], [4, 33]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-render/eg-footer-cell-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components/eg-render');
  test('integration/components/eg-render/eg-footer-cell-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-render/eg-footer-cell-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-render/eg-footer/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-render/eg-footer', 'Integration | Component | eg render/eg footer', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 23
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
        statements: [['content', 'eg-render/eg-footer', ['loc', [null, [1, 0], [1, 23]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-render/eg-footer', [], [], 0, null, ['loc', [null, [2, 4], [4, 28]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-render/eg-footer/component-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components/eg-render/eg-footer');
  test('integration/components/eg-render/eg-footer/component-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-render/eg-footer/component-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-render/eg-header-cell-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-render/eg-header-cell', 'Integration | Component | eg-render/eg-header-cell', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 28
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
        statements: [['content', 'eg-render/eg-header-cell', ['loc', [null, [1, 0], [1, 28]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-render/eg-header-cell', [], [], 0, null, ['loc', [null, [2, 4], [4, 33]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-render/eg-header-cell-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components/eg-render');
  test('integration/components/eg-render/eg-header-cell-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-render/eg-header-cell-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-render/eg-header-cell/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-render/eg-header-cell', 'Integration | Component | eg render/eg header cell', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 28
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
        statements: [['content', 'eg-render/eg-header-cell', ['loc', [null, [1, 0], [1, 28]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-render/eg-header-cell', [], [], 0, null, ['loc', [null, [2, 4], [4, 33]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-render/eg-header-cell/component-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components/eg-render/eg-header-cell');
  test('integration/components/eg-render/eg-header-cell/component-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-render/eg-header-cell/component-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-render/eg-header-resize-handle/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-render/eg-header-resize-handle', 'Integration | Component | eg render/eg header resize handle', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 37
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
        statements: [['content', 'eg-render/eg-header-resize-handle', ['loc', [null, [1, 0], [1, 37]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-render/eg-header-resize-handle', [], [], 0, null, ['loc', [null, [2, 4], [4, 42]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-render/eg-header-resize-handle/component-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components/eg-render/eg-header-resize-handle');
  test('integration/components/eg-render/eg-header-resize-handle/component-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-render/eg-header-resize-handle/component-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/eg-render/eg-header/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('eg-render/eg-header', 'Integration | Component | eg render/eg header', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 23
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
        statements: [['content', 'eg-render/eg-header', ['loc', [null, [1, 0], [1, 23]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'eg-render/eg-header', [], [], 0, null, ['loc', [null, [2, 4], [4, 28]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/eg-render/eg-header/component-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components/eg-render/eg-header');
  test('integration/components/eg-render/eg-header/component-test.js should pass jshint', function() { 
    ok(true, 'integration/components/eg-render/eg-header/component-test.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/ember-grid-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ember-infinite-table', 'Integration | Component | ember infinite table', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['content', 'ember-infinite-table', ['loc', [null, [1, 0], [1, 24]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0-canary+eeed334b',
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0-canary+eeed334b',
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
        statements: [['block', 'ember-infinite-table', [], [], 0, null, ['loc', [null, [2, 4], [4, 29]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/ember-grid-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components');
  test('integration/components/ember-grid-test.js should pass jshint', function() { 
    ok(true, 'integration/components/ember-grid-test.js should pass jshint.'); 
  });

});
define('dummy/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('dummy/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/eg-column/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('eg-column', 'Unit | Model | eg column', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('dummy/tests/unit/eg-column/model-test.jshint', function () {

  'use strict';

  module('JSHint - unit/eg-column');
  test('unit/eg-column/model-test.js should pass jshint', function() { 
    ok(true, 'unit/eg-column/model-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/helpers/eg-add-test', ['dummy/helpers/eg-add', 'qunit'], function (eg_add, qunit) {

  'use strict';

  qunit.module('Unit | Helper | eg add');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = eg_add.egAdd(42);
    assert.ok(result);
  });

});
define('dummy/tests/unit/helpers/eg-add-test.jshint', function () {

  'use strict';

  module('JSHint - unit/helpers');
  test('unit/helpers/eg-add-test.js should pass jshint', function() { 
    ok(true, 'unit/helpers/eg-add-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/helpers/eg-cell-data-test', ['dummy/helpers/eg-cell-data', 'qunit'], function (eg_cell_data, qunit) {

  'use strict';

  qunit.module('Unit | Helper | eg cell data');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = eg_cell_data.egCellData(42);
    assert.ok(result);
  });

});
define('dummy/tests/unit/helpers/eg-cell-data-test.jshint', function () {

  'use strict';

  module('JSHint - unit/helpers');
  test('unit/helpers/eg-cell-data-test.js should pass jshint', function() { 
    ok(true, 'unit/helpers/eg-cell-data-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/utils/dom-util-test', ['dummy/utils/dom-util', 'qunit'], function (domUtil, qunit) {

  'use strict';

  qunit.module('Unit | Utility | dom util');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = domUtil['default']();
    assert.ok(result);
  });

});
define('dummy/tests/unit/utils/dom-util-test.jshint', function () {

  'use strict';

  module('JSHint - unit/utils');
  test('unit/utils/dom-util-test.js should pass jshint', function() { 
    ok(true, 'unit/utils/dom-util-test.js should pass jshint.'); 
  });

});
define('dummy/tests/utils/generate-data.jshint', function () {

  'use strict';

  module('JSHint - utils');
  test('utils/generate-data.js should pass jshint', function() { 
    ok(true, 'utils/generate-data.js should pass jshint.'); 
  });

});
define('dummy/utils/generate-data', ['exports', 'ember'], function (exports, Ember) {

  'use strict';


  exports['default'] = generateData;
  /* globals Chance, _ */
  // Generate random data
  // See http://chancejs.com/ for details of possible fields.

  var globalChance = new Chance(13345);

  /**
   * Generate array of objects with random data
   *
   * @param nrows {Number} number of rows
   * @param columns {Object} map name->datatype
   *  
   */
  function generateData(nrows, columns, seed) {
    var chance = seed == null ? globalChance : new Chance(seed);
    return Ember['default'].A(Array.apply(null, new Array(nrows)).map(function () {
      return _.object(Object.keys(columns).map(function (name) {
        var datatype = columns[name];
        var options;
        if (typeof datatype === 'string') {
          options = undefined;
        } else {
          options = datatype.options;
          datatype = datatype.name;
        }
        var data = chance[datatype](options);
        return [name, data];
      }));
    }));
  }

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dummy/tests/test-helper");
} else {
  require("dummy/app")["default"].create({"name":"ember-grid","version":"0.0.1+93b6b05c"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map