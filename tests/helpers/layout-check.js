/* globals _ */
// tests/helpers/layout-check.js

import { getElement, readElementDimensions } from './element';

export function checkWidths(context, expectedWidth, expectedColumnWidths) {
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
export function checkCellWidth(context, element, i, expColWidth) {
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
export function checkHorizontalScroll(context, enabled, present) {
  var grid = getElement(context, 'grid');
  var gridStyle = window.getComputedStyle(grid);
  if (enabled === true) {
    context.assert.equal(gridStyle.overflowX, 'scroll');
  } else if (enabled === false) {
    context.assert.equal(gridStyle.overflowX, 'hidden');
  } else {
    context.assert.equal(gridStyle.overflowX, 'auto');
  }
  var display = grid.getElementsByClassName('display')[0];
  // allow one pixel play
  if (display.scrollWidth == null) {
    context.assert.isFalse(present);
  } else {
    context.assert.equal(
      display.scrollWidth - 2 > grid.clientWidth, present);
  }
}