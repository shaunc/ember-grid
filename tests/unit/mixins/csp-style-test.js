import Ember from 'ember';
import CspStyleMixin from '../../../mixins/csp-style';
import { module, test } from 'qunit';

module('Unit | Mixin | csp style');

// Replace this with your real tests.
test('it works', function(assert) {
  var CspStyleObject = Ember.Object.extend(CspStyleMixin);
  var subject = CspStyleObject.create();
  assert.ok(subject);
});
