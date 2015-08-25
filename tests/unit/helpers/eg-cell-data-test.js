import { egCellData } from '../../../helpers/eg-cell-data';
import { module } from 'qunit';
import { test } from '../../helpers/chai-assert';

module('Unit | Helper | eg cell data');

function defaultData() {
  var row = {foo: 'the-foo', 'bar': 'the-bar'};
  var data = [];
  data[42] = row;
  return data;
}

test('retrieves row element corresponding to key', function(assert) {
  var column = {key: 'foo'};
  var data = defaultData();
  var result = egCellData([data, 42, column]);
  assert.equal(result, 'the-foo');
});

test('retrieves full row', function(assert) {
  var column = {key: 'foo', field: '@row'};
  var data = defaultData();
  var result = egCellData([data, 42, column]);
  assert.deepEqual(result, data[42]);
});

test('retrieves row index', function(assert) {
  var column = {key: 'foo', field: '@rowIndex'};
  var data = defaultData();
  var result = egCellData([data, 42, column]);
  assert.equal(result, 42);
});

test('retrieves string field', function(assert) {
  var column = {key: 'foo', field: 'bar'};
  var data = defaultData();
  var result = egCellData([data, 42, column]);
  assert.equal(result, 'the-bar');
});

test('retrieves via callback', function(assert) {
  var data = defaultData();
  var column = {key: 'foo', field(row, rowIndex, column_) {
    assert.equal(row, data[42]);
    assert.equal(rowIndex, 42);
    assert.equal(column_, column);
    return 734;
  }};
  var result = egCellData([data, 42, column]);
  assert.deepEqual(result, 734);
});
