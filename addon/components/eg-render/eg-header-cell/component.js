// component eg-render/eg-header-cell

import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['cell'],
  attributeBindings: ['style'],
  classNameBindings: ['isDragging:dragging'],

  _header: Ember.computed.alias('_column._zones.header'),
  align: Ember.computed.alias('_column.align'),

  width: Ember.computed('_column.width', {
    get(/*key*/) {
      return this.get('_column.width');
    },
    set(key, value) {
      value = this.constrainDragWidth(value);
      this.set('_column.width', value);
      return value;
    }
  }),

  resizable: Ember.computed.alias('_column.resizable'),

  isDragging: Ember.computed('parentView.draggingHeaderCell', function() {
    return this === this.get('parentView.draggingHeaderCell');
  }),

  didInsertElement: function() {
    this._super();
  	Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('width', this.constrainDragWidth(this.get('width')));
  		this.renderHeader();
  	});
  },

  didReceiveAttrs: function() {
    this._super();
  	this.set('_column', this.attrs.column.value);
  },

  renderHeader: function() {
  	var header = this.get('_header');
  	if (header)
  	{
	    var sourceElement = header.element;
	    var destinationElement = this.get('element');
	    var node = sourceElement.firstChild;
	    var lastNode = sourceElement.lastChild;
	    while(node) {
	      destinationElement.insertBefore(node, null);
	      node = node !== lastNode ? lastNode.parentNode.firstChild : null;
	    }
	  }
  },

  text: Ember.computed('_column.header', '_column.key', function() {
    var result = this.get('_column.header');
    if (result)
    {
      return result;
    }
    var key = this.get('_column.key');
    return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  }),

  style: Ember.computed('width', function() {
    return 'width:'+this.get('width')+'px;';
  }),

  startDragging: function() {
    this.set('parentView.draggingHeaderCell', this);
  },

  minSize: Ember.computed('_column.min-width', function() {
    var element = this.$();
    var cssInt = function(name) {
      return parseInt(this.css(name));
    }.bind(element);

    var colMinWidth = this.get('_column.min-width') + cssInt("padding-left") + cssInt("padding-right") + 
                                                      cssInt("border-left")  + cssInt("border-right") + 
                                                      cssInt("margin-left")  + cssInt("margin-right");

    return Math.max(cssInt("min-width"), colMinWidth);
  }),

  maxSize: Ember.computed('_column.max-width', function() {
    var element = this.$();
    var cssInt = function(name) {
      return parseInt(this.css(name));
    }.bind(element);

    var cssMaxWidth = cssInt("max-width");
    if (!cssMaxWidth) {
      cssMaxWidth = Number.MAX_VALUE;
    }
    
    var colMaxWidth = this.get('_column.max-width') + cssInt("padding-left") + cssInt("padding-right") + 
                                                      cssInt("border-left")  + cssInt("border-right") + 
                                                      cssInt("margin-left")  + cssInt("margin-right");
    if (!colMaxWidth) {
      colMaxWidth = Number.MAX_VALUE;
    }

    return Math.min( cssMaxWidth, colMaxWidth);
  }),

  constrainDragWidth: function(newWidth) {
    var minSize = this.get('minSize');
    var maxSize = this.get('maxSize');
    if (minSize && newWidth < minSize) {
      newWidth = minSize;
    }
    if (maxSize && newWidth > maxSize) {
      newWidth = maxSize;
    }
    return newWidth;
  }

});
