import Ember from 'ember';
import layout from './eg-footer-cell/template';

export default Ember.Component.extend({
  layout: layout,

  didInsertElement: function() {
  	Ember.run.next(this, function() {
  		this.renderFooter();
  	});
  },

  didReceiveAttrs: function() {
  	this.set('_column', this.attrs.column.value);
  },

  renderFooter: function() {
  	var column = this.get('_column');
  	var footer = column._zones.footer;
  	this.set('_footer', footer);
  	if (footer)
  	{
	    var sourceElement = footer.element;
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
