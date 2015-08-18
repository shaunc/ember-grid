/* globals Chance, _ */
// Generate random data

import Ember from 'ember';

var globalChance = new Chance(13345);

/**
 * Generate array of objects with random data
 *
 * @param nrows {Number} number of rows
 * @param columns {Object} map name->datatype
 *  
 */
export default function generateData(nrows, columns, seed) {
  var chance = (seed == null) ? globalChance : new Chance(seed);
  return Ember.A(Array.apply(null, new Array(nrows)).map( function() {
    return _.object( Object.keys(columns).map( function(name) {
      var datatype = columns[name];
      var options;
      if (typeof datatype === 'string') {
        options = undefined;
      }
      else {
        options = datatype.options;
        datatype = datatype.name;
      }
      var data = chance[datatype](options);
      return [name, data];
    })) ;
  }));
}