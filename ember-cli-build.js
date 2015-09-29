/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    // Add options here
    /*
     * The following needed by phantomjs & safari. However, phantomjs
     * hits another problem (see below), and is turned off in testem.
     */
    babel: {
      //optional: ['es6.spec.symbols'],
      includePolyfill: true
    }
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import( app.bowerDirectory + '/chai/chai.js', {test: true});
  app.import( app.bowerDirectory + '/chance/chance.js', {test: true});
  app.import( app.bowerDirectory + '/lodash/lodash.js', {test: true});
  app.import( app.bowerDirectory + '/ember/ember-template-compiler.js');

  return app.toTree();
};
