// eg-render/eg-header-resize-handle

import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['resize-handle'],
  classNameBindings: ['isDragging:dragging'],

  headerCell: Ember.computed.alias('parentView'),
  isDragging: Ember.computed.alias('headerCell.isDragging'),

  header: Ember.computed.alias('headerCell.parentView'),
  draggingHeaderCell: Ember.computed.alias('header.draggingHeaderCell'),

  mouseDown: function(event) {
  	var header = this.get('header');
  	if (header)
  	{
  		header.set('draggingHeaderCell', this.get('headerCell'));
  	}
  	this.startMouseCapture();
    event.preventDefault();
  },

  startMouseCapture: function() {
  	document.onmousemove = this.docMouseMove.bind(this);
  	document.onmouseup = this.docMouseUp.bind(this);
  	document.onmouseleave = this.docMouseLeave.bind(this);
  },

  endMouseCapture: function() {
  	document.onmousemove = null;
  	document.onmouseup = null;
  },

  docMouseUp: function() {
  	var header = this.get('header');
  	if (header)
  	{
  		header.set('draggingHeaderCell', null);
  	}
  	this.endMouseCapture();
  },

  docMouseLeave: function() {
  	var header = this.get('header');
  	if (header)
  	{
  		header.set('draggingHeaderCell', null);
  	}
  	this.endMouseCapture();
  },

  docMouseMove: function(event) {
    if(!this.get('isDragging')) {
      console.log('not dragging');
      return;
    }

    var cell = this.get('draggingHeaderCell');
    var offset = cell.$().offset();
    var newWidth = event.pageX - offset.left;
    if (newWidth < 5) { newWidth = 5; }

    cell.set('width', newWidth);
  }


});
