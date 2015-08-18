import Ember from 'ember';

export function egAdd(params/*, hash*/) {
  // convert sum to string to avoid falsy return
  return (params[0] + params[1]) + '';
}

export default Ember.Helper.helper(egAdd);
