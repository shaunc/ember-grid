// tests/spec/defining-the-window/width-test.js

import { test } from '../../helpers/chai-assert';
import moduleForIntegration from '../../helpers/test-component';
import { personTable500, columns, columnsWithWidths } from '../../helpers/example-data';
//import { addStyles } from '../../helpers/styles';
import { renderTemplate } from '../../helpers/render';
import { checkWidths } from '../../helpers/layout-check';


// --------------------------------------------------------------------------
// explicit width
// --------------------------------------------------------------------------
moduleForIntegration(
  'spec/defining-the-window/width', 
  'use explicit ember-grid.width to control horizontal layout');

test('explicit width controls grid width', function() {
  var width = 400, data = personTable500, height = 400, showFooter=true;
  renderTemplate(this, {width, height, data, columns, showFooter});
  andThen(()=>{
    checkWidths(this, 400, [100, 100, 100, 100]);
  });
});

test('explicit width controls grid width independent of column widths', function() {
  var width = 400, data = personTable500, height = 400;
  renderTemplate(this, {width, height, data, columns: columnsWithWidths});
  andThen(()=>{
    checkWidths(this, 400, [50, 100, 150, 200]);
  });
});

test('explicit width controls grid width independent of column widths when grid is wider than columns', function() {
  var width = 1000, data = personTable500, height = 400;
  renderTemplate(this, {width, height, data, columns: columnsWithWidths});
  andThen(()=>{
    checkWidths(this, 1000, [50, 100, 150, 200]);
  });
});

// --------------------------------------------------------------------------
// implicit width
// --------------------------------------------------------------------------






