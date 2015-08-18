import Ember from 'ember';

/**
 *  takes eg-body component and row index; returns data for field.
 */
export function egCellData(params/*, hash*/) {
  var egBody = params[0];
  var rowIndex = params[1];
  return egBody.field(rowIndex);
}

export default Ember.Helper.helper(egCellData);
