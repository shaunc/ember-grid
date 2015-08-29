// tests/spec/defining-the-window/horizontal-scroll-test.js

import { test } from '../../helpers/chai-assert';
import moduleForIntegration from '../../helpers/test-component';
import { 
  personTable500, columns, columnsWithWidths 
  } from '../../helpers/example-data';
//import { addStyles } from '../../helpers/styles';
import { renderTemplate } from '../../helpers/render';
import { checkHorizontalScroll } from '../../helpers/layout-check';

// --------------------------------------------------------------------------
// horizontal scroll
// --------------------------------------------------------------------------
moduleForIntegration(
  'spec/defining-the-window/horizontal-scroll', 
  'horizontal scroll enabled by default if columns wider than body');

test('base case: columns fit; no scroll', function(){
  var width = 400, data = personTable500, height = 400, showFooter=true;
  renderTemplate(this, {width, height, data, columns, showFooter});
  checkHorizontalScroll(this, null, false);
});

test('more columns than width enables horizontal scroll', function(){
  var width = 400, data = personTable500, height = 400, showFooter=true;
  renderTemplate(this, {
    width, height, data, columns: columnsWithWidths, showFooter});
  checkHorizontalScroll(this, null, true);
});
