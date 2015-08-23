// eg-render/eg-body-row

import Ember from 'ember';
import layout from './template';
import { copyChildren } from 'ember-grid/utils/dom-util';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['row'],
  classNameBindings: [ 'isFirstInWindow:first', 'isLastInWindow:last' ],

  windowIndex: Ember.computed('parentView.offset', 'rowIndex', function() { 
    var offset = this.get('parentView.offset');
    var rowIndex = this.getAttr('rowIndex');
    console.log("row", rowIndex, offset, rowIndex - offset);
    return rowIndex - offset;
  }),

  isFirstInWindow: Ember.computed.equal('windowIndex', 0),

  isLastInWindow: Ember.computed(
      'rowIndex', function (){
    var parentView = this.get('parentView');
    var {offset, limit} = parentView;
    if (offset != null && limit != null) {
      var rowIndex = this.get('rowIndex');
      return offset + limit == rowIndex - 1;
    }
  }),

  didInitAttrs: function() {
    this._super();
    var columns = this.getAttr('columns');
    if ( columns != null ) {
      this._childrenPresent = columns.map(()=> false);
      this._rowIndex = null;
    }
  },

  didRender: function() {
    this._super.apply(this, arguments);
    if (!this.get('isVisible')) {
      return;
    }
    var columns = this.get('columns');
    if (columns == null || columns.length === 0) { return; }
    var rowIndex = this.get('rowIndex');
    var cellElements = this.element.getElementsByClassName('eg-body-cell');
    var oldRowIndex = this._rowIndex;
    var allPresent = ()=>
      this._childrenPresent.reduce(
        function(r, p){ return r && p; }, true );

    if (oldRowIndex === rowIndex ) { 
      if (allPresent()) { return; }
    }
    var oldChildrenPresent = this._childrenPresent;
    this._childrenPresent = columns.map(function(column, icol) {
      // we've already got the cell's children -- do nothing
      if (oldRowIndex === rowIndex && oldChildrenPresent[icol]) { 
        return true; 
      }
      var source = column._zones.body.source;
      if (source == null) { 
        // default contents.
        return true; 
      }
      var destElement = cellElements[icol];
      /* 
          TODO for the moment we are copying elements, as on fast scrolling
          one element may render with content before another has given it back.
          Revist when using "scroll-ring".

      // if we have content from elsewhere, put it back
      if (oldRowIndex != null && oldRowIndex !== rowIndex && 
          oldChildrenPresent[icol]) {
        let oldSourceElement = source.getCellElement(oldRowIndex);
        moveChildren(destElement, oldSourceElement);
      }*/
      var sourceElement = source.getCellElement(rowIndex);
      if (sourceElement == null || sourceElement.firstChild == null) { 
        return false; 
      }
      copyChildren(sourceElement, destElement, true);
      return true;
    });
    if (!allPresent()) {
      this.element.style.opacity = '0';
      Ember.run.next(this, function() {
        if (!this.get('isDestroying')) {
          this.element.style.opacity = null;
          this.rerender();
        }
      });
    }
    this._rowIndex = rowIndex;
  }  
});
