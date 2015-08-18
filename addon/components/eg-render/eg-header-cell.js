import Ember from 'ember';
import layout from './eg-header-cell/template';

export default Ember.Component.extend({
  layout: layout,

  _header: Ember.computed.alias('_column._zones.header'),

  didInsertElement: function() {
  	Ember.run.next(this, function() {
  		this.renderHeader();
  	});
  },

  didReceiveAttrs: function() {
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
  }
});
