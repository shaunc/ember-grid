/* globals _ */
// tests/spec/defining-the-window/width-test.js

import { test } from '../../helpers/chai-assert';
import moduleForIntegration from '../../helpers/test-component';
import { personTable500 } from '../../helpers/example-data';
import { getElement, readElementDimensions } from '../../helpers/element';
//import { addStyles } from '../../helpers/styles';
import { renderTemplate } from '../../helpers/render';

var columns = 'name,age,salary,email';
var width = 0;
var columnsWithWidths = columns.split(',').map(key=>{
  width += 50;
  return { key, width};
});

function checkWidths(context, expectedWidth, expectedColumnWidths) {
  var {width: elementWidth} = readElementDimensions(context, 'grid', 'width');
  context.assert.equal(elementWidth, expectedWidth);

  // make sure columns rendered with correct widths
  var columns = context.get('columns');
  if (typeof columns === 'string') {
    columns = columns.split(',').map(key => {key}); // jshint ignore:line
  }
  var header = getElement(context, 'header');
  var body = getElement(context, 'body');
  var footer = getElement(context, 'footer');
  columns.forEach((col, i)=>{
    var expColWidth = expectedColumnWidths[i];
    expColWidth = checkCellWidth(context, header, i, expColWidth);
    var rows = body.getElementsByClassName('row') || [];
    rows = _.filter(rows, row => row.style.display !== 'none');
    rows.forEach(row=>{
      expColWidth = checkCellWidth(context, row, i, expColWidth);
    });
    checkCellWidth(context, footer, i, expColWidth);
  });
}
function checkCellWidth(context, element, i, expColWidth) {
  if (element == null) {
    return expColWidth;
  }
  var cells = element.getElementsByClassName('cell');
  var cell = cells[i];
  context.assert.isDefined(cell, `cell ${i} is defined`);
  if(expColWidth != null) {
    context.assert.equal(cell.offsetWidth, expColWidth);
  } else {
    expColWidth = cell.offsetWidth;
  }
  return expColWidth;
}

// --------------------------------------------------------------------------
// explicit width
// --------------------------------------------------------------------------
moduleForIntegration(
  'spec/defining-the-window/width', 
  'use explicit ember-grid.width to control horizontal layout');

test('explicit width controls grid width', function() {
  var width = 400, data = personTable500, height = 400;
  renderTemplate(this, {width, height, data, columns});
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

