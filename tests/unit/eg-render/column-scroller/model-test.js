import { moduleForModel, test } from 'ember-qunit';

moduleForModel('eg-render/column-scroller', 'Unit | Model | eg render/column scroller', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
