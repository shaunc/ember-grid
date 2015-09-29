/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-grid',

  included: function(app, parentAddon) {
    this._super.included(app);
    var target = (parentAddon || app);    
    target.import( target.bowerDirectory + '/lodash/lodash.js');

  }
};
