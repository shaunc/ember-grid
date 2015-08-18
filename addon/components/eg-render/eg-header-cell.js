import Ember from 'ember';
import layout from './eg-header-cell/template';

export default Ember.Component.extend({
  layout: layout,

  didInsertElement: function() {
    this._super();
  	Ember.run.next(this, function() {
  		this.renderHeader()
  	});
  },

  didReceiveAttrs: function() {
    this._super();
  	this.set('_column', this.attrs.column.value);
  },

  renderHeader: function() {
  	var column = this.get('_column');
  	var header = column._zones.header;
  	this.set('_header', header);
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
