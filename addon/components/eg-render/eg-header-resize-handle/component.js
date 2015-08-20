// component eg-render/eg-header-resize-handle

import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['resize-handle'],
	classNameBindings: ['isDragging:dragging'],

	isDragging: Ember.computed.alias('parentView.isDragging'),

  mouseDown: function(event) {
  	this.get('parentView').startDragging();
    event.preventDefault();
  }
});
