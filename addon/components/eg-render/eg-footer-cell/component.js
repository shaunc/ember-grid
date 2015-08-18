import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['cell'],
  attributeBindings: ['style'],

  _footer: Ember.computed.alias('_column._zones.footer'),
  width: Ember.computed.alias('_column.width'),

  didInsertElement: function() {
  	Ember.run.next(this, function() {
  		this.renderFooter();
  	});
  },

  didReceiveAttrs: function() {
  	this.set('_column', this.attrs.column.value);
  },

  renderFooter: function() {
  	var footer = this.get('_footer');
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
  },

  style: Ember.computed('width', function() {
    return 'width:'+this.get('width')+'px;';
  })
});
