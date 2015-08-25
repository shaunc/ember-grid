/* globals chai */
import { test as qtest } from 'ember-qunit';

// A test that swaps qunit assertion for (a proxy of) chai
// assertion.


function getChaiAssert(assert) {
  var cassert = {expect: function (n) { assert.expect(n); }};
  for (let key of Object.keys(chai.assert)) {
    let meth = chai.assert[key];
    patchAssertMethod(cassert, assert, key, meth);
  }
  return cassert;
}
function patchAssertMethod(cassert, qassert, key, method) {
  cassert[key] = function() {
    try {
      method.apply(chai.assert, arguments);
    } catch (err) {
      qassert.ok(false, err.message);
      return;
    }
    qassert.ok(true);
  };
}


export function test(name, callback) {
  qtest(name, function(assert) {
    var cassert = getChaiAssert(assert);
    return callback.call(this, cassert);
  });
}
