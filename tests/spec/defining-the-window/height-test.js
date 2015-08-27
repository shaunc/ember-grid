// tests/spec/defining-the-window/height-test.js

import { test } from '../../helpers/chai-assert';
import moduleForIntegration from '../../helpers/test-component';
import { personTable500 } from '../../helpers/example-data';
import { getElement, readElementDimensions } from '../../helpers/element';
import { addStyles } from '../../helpers/styles';
import { renderTemplate } from '../../helpers/render';

var columns = 'name,age,salary,email';

function checkHeights(context, expectedHeight) {
    var {height: elementHeight} = readElementDimensions(context, 'grid', 'height');
    context.assert.equal(elementHeight, expectedHeight);
    var headerHeight = readOuterHeight(context, 'header');
    var bodyHeight = readOuterHeight(context, 'body');
    var footerHeight = readOuterHeight(context, 'footer');
    // XXX sometimes 1px border ends up as 2px border!
    // use approximate compare for the moment.
    var contentHeight = headerHeight + bodyHeight + footerHeight;
    var nparts = (headerHeight > 0) + (bodyHeight > 0) + (footerHeight > 0);
    context.assert.closeTo(elementHeight, contentHeight, nparts);
}
function readOuterHeight(context, name) {
  var element = getElement(context, name);
  if (element == null) { return 0; }
  return element.offsetHeight;
}


// --------------------------------------------------------------------------
// explicit height
// --------------------------------------------------------------------------
moduleForIntegration(
  'spec/defining-the-window/height', 
  'use explicit ember-grid.height to control vertical layout');

test('explicit height controls element height', function(assert) {
  var height = 400, data = personTable500;
  assert.expect(2);
  renderTemplate(this, {height, data, columns});
  andThen(()=>{
    checkHeights(this, 400);
  });
});
test('explicit height w/o header controls element height', function(assert) {
  var height = 400, data = personTable500, showHeader = false;
  assert.expect(2);
  renderTemplate(this, {height, data, columns, showHeader});
  andThen(()=>{
    checkHeights(this, 400);
  });
});
test('explicit height w/ header & footer controls element height', function(assert) {
  var height = 400, data = personTable500, showFooter = true;
  assert.expect(2);
  renderTemplate(this, {height, data, columns, showFooter});
  andThen(()=>{
    checkHeights(this, 400);
  });
});
test('explicit height w/ no header & footer controls element height', function(assert) {
  var height = 400, data = personTable500, showHeader = false, showFooter = true;
  assert.expect(2);
  renderTemplate(this, {height, data, columns, showHeader, showFooter});
  andThen(()=>{
    checkHeights(this, 400);
  });
});


// --------------------------------------------------------------------------
// implicit height: fill parent
// --------------------------------------------------------------------------
moduleForIntegration(
  'spec/defining-the-window/height', 
  'use parent context to control vertical layout');

test('height to potential in parent when no height, scroll or css', function(assert){
  var data = personTable500;
  assert.expect(2);
  addStyles({'> *': 'height: 400px;'});
  renderTemplate(this, {data, columns});
  andThen(()=>{
    checkHeights(this, 400);
  });
});
test('height  to potential in parent when no height, scroll or css; no header', function(assert){
  var data = personTable500, showHeader = false;
  assert.expect(2);
  addStyles({'> *': 'height: 400px;'});
  renderTemplate(this, {data, columns, showHeader});
  andThen(()=>{
    checkHeights(this, 400);
  });
});
test('height to potential in parent when no height, scroll or css; footer', function(assert){
  var data = personTable500, showFooter = true;
  assert.expect(2);
  addStyles({'> *': 'height: 400px;'});
  renderTemplate(this, {data, columns, showFooter});
  andThen(()=>{
    checkHeights(this, 400);
  });
});
test('height to potential in parent when no height, scroll or css; no header & footer', function(assert){
  var data = personTable500, showHeader = false, showFooter = true;
  assert.expect(2);
  addStyles({'> *': 'height: 400px;'});
  renderTemplate(this, {data, columns, showHeader, showFooter});
  andThen(()=>{
    checkHeights(this, 400);
  });
});

// --------------------------------------------------------------------------
// implicit height: from css
// --------------------------------------------------------------------------
test('css height respect when no explicit height or scroll', function(assert){
  var data = personTable500;
  assert.expect(2);
  addStyles({'.ember-grid': 'height: 300px;'});
  renderTemplate(this, {data, columns});
  andThen(()=>{
    checkHeights(this, 300);
  });
});
test('css height respect when no explicit height or scroll; no header', function(assert){
  var data = personTable500, showHeader = false;
  assert.expect(2);
  addStyles({'.ember-grid': 'height: 300px;'});
  renderTemplate(this, {data, columns, showHeader});
  andThen(()=>{
    checkHeights(this, 300);
  });
});
test('css height respect when no explicit height or scroll; footer', function(assert){
  var data = personTable500, showFooter = true;
  assert.expect(2);
  addStyles({'.ember-grid': 'height: 300px;'});
  renderTemplate(this, {data, columns, showFooter});
  andThen(()=>{
    checkHeights(this, 300);
  });
});
test('css height respect when no explicit height or scroll; no header, footer', function(assert){
  var data = personTable500, showHeader = false, showFooter = true;
  assert.expect(2);
  addStyles({'.ember-grid': 'height: 300px;'});
  renderTemplate(this, {data, columns, showHeader, showFooter});
  andThen(()=>{
    checkHeights(this, 300);
  });
});


