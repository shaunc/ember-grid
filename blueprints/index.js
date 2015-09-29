/** @module blueprints/index.js */

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('lodash');
  }
};