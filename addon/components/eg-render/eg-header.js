import Ember from 'ember';
import layout from '../../templates/components/eg-render/eg-header';

export default Ember.Component.extend({
  layout: layout,

  didInsertElement: function() {
  	Ember.run.next(this, function() {
  		this.renderHeader()
  	});
  },

  didReceiveAttrs: function() {
  	this.set('_column', this.attrs.column.value);
  },

  renderHeader: function() {
  	var column = this.get('_column');
  	var header = column._zones.header;
  	this.set('_header', header);
  	if (header)
  	{
	    var sourceElement = header.get('element');
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
