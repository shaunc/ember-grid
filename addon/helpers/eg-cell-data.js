import Ember from 'ember';

/**
 * Return field data for column given row index.
 *  
 * @param data array of data
 * @param rowIndex index from which to retrieve data
 * @param column metadata for column
 */
export function egCellData(params/*, hash*/) {
  var [data, rowIndex, column] = params;
  var {key, field} = column;
  var row = data[rowIndex];
  if (typeof field === 'function') {
    return field(row, rowIndex, column);
  } else if (field === '@row') {
    return row;
  } else if (field === '@rowIndex') {
    return rowIndex;
  } else if (field != null) {
    return row[field];
  } else {
    return row[key];
  }
}

export default Ember.Helper.helper(egCellData);
