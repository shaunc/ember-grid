import { moveChildren, removeChildren, copyChildren } from 'ember-grid/utils/dom-util';
import { module } from 'qunit';
import { test } from '../../helpers/chai-assert';

module('Unit | Utility | dom util', {
  beforeEach() {
    var $container = $('#ember-testing');
    $container.append('<div id="src"><div id="item1"></div><div id="item2"></div></div>');
    $container.append('<div id="dest"></div>');
  },
  afterEach() {
    var $container = $('#ember-testing');
    $container.empty();    
  }
});
function getTargets(assert) {
  var [src, dest] = [$('#src')[0], $('#dest')[0]];
  assert.equal(src.childNodes.length, 2);
  assert.equal(dest.childNodes.length, 0);
  return [src, dest];
}

test('move children: no source nothing done', function(assert) {
  var [src, dest] = getTargets(assert);
  moveChildren(null, dest);
  assert.equal(src.childNodes.length, 2);
  assert.equal(dest.childNodes.length, 0);
});

test('move children: no dest nothing done', function(assert) {
  var [src, dest] = getTargets(assert);
  moveChildren(src, null);
  assert.equal(src.childNodes.length, 2);
  assert.equal(dest.childNodes.length, 0);
});

test('move children', function(assert) {
  var [src, dest] = getTargets(assert);
  moveChildren(src, dest);
  assert.equal(src.childNodes.length, 0);
  assert.equal(dest.childNodes.length, 2);
});

test('move children & dont replace appends to existing', function(assert) {
  var [src, dest] = getTargets(assert);
  $(dest).append("<div id='prev'></div>");
  moveChildren(src, dest);
  assert.equal(src.childNodes.length, 0);
  assert.equal(dest.childNodes.length, 3);
  assert.equal(dest.childNodes[0].id, 'prev');
});

test('move children & replace overwrites existing', function(assert) {
  var [src, dest] = getTargets(assert);
  $(dest).append("<div id='prev'></div>");
  moveChildren(src, dest, true);
  assert.equal(src.childNodes.length, 0);
  assert.equal(dest.childNodes.length, 2);
  assert.equal(dest.childNodes[0].id, 'item1');
});

test('remove children no source does nothing', function(assert){
  assert.expect(0);
  removeChildren();
});

test('remove children no children does nothing', function(assert){
  var dest = getTargets(assert)[1];
  assert.equal(dest.childNodes.length, 0);
  removeChildren(dest);
  assert.equal(dest.childNodes.length, 0);
});

test('remove children', function(assert){
  var [src] = getTargets(assert);
  removeChildren(src);
  assert.equal(src.childNodes.length, 0);
});

test('copy children no src does nothing', function(assert){
  var [src] = getTargets(assert);
  copyChildren(null, src);
  assert.equal(src.childNodes.length, 2);

});

test('copy children no dest does nothing', function(assert){
  var [src] = getTargets(assert);
  copyChildren(src, null);
  assert.equal(src.childNodes.length, 2);
});

test('copy children', function(assert){
  var [src, dest] = getTargets(assert);
  copyChildren(src, dest);
  assert.equal(src.childNodes.length, 2);
  assert.equal(dest.childNodes.length, 2);
});

test('copy children no replace appends children', function(assert){
  var [src, dest] = getTargets(assert);
  $(dest).append("<div id='prev'></div>");
  copyChildren(src, dest);
  assert.equal(src.childNodes.length, 2);
  assert.equal(dest.childNodes.length, 3);
  assert.equal(dest.childNodes[0].id, 'prev');

});

test('copy children w/ replace overwrites children', function(assert){
  var [src, dest] = getTargets(assert);
  $(dest).append("<div id='prev'></div>");
  copyChildren(src, dest, true);
  assert.equal(src.childNodes.length, 2);
  assert.equal(dest.childNodes.length, 2);
  assert.equal(dest.childNodes[0].id, 'item1');
});

