import potentialDimensions from 'ember-grid/utils/potential-dimensions';
import { module } from 'qunit';
import { test } from '../../helpers/chai-assert';
import { addStyles, removeStyles } from '../../helpers/styles';

module('Unit | Utility | potential dimensions', {
  beforeEach() {
    var $container = $('#ember-testing');
    $container.append('<div id="parent"><div id="child"></div></div>');
  },
  afterEach() {
    var $container = $('#ember-testing');
    $container.empty();    
    removeStyles();
  }

});

test('potential dimensions returns nothing if no element', function(assert){
  assert.isUndefined(potentialDimensions());
});

test('potential dimensions: outer corresponding to parent; inner minus boundary', function(assert) {
  addStyles({
    '#parent': 'height: 200px; width: 300px;',
    '#child': 'display: inline-block; position: relative; border: 1px solid black'
  });
  var child = $('#child')[0];
  var {inner, outer} = potentialDimensions(child);
  assert.equal(outer.width, 300);
  assert.equal(outer.height, 200);
  assert.equal(inner.width, 298);
  assert.equal(inner.height, 198);
  var styles = window.getComputedStyle(child);
  assert.equal(styles.display, 'inline-block');
  assert.equal(styles.position, 'relative');
  assert.equal(styles['box-sizing'], 'content-box');
  assert.equal(styles.height, '0px');
  assert.equal(styles.width, '0px');
});