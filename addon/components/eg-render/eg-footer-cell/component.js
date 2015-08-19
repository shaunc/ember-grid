import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['cell'],
  attributeBindings: ['style'],

  _footer: Ember.computed.alias('_column._zones.footer'),
  align: Ember.computed.alias('_column.align'),
  width: Ember.computed.alias('_column.width'),

  didInsertElement: function() {
    this._super();
  	Ember.run.scheduleOnce('afterRender', this, function() {
  		this.renderFooter();
  	});
  },

  didReceiveAttrs: function() {
    this._super();
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

  text: Ember.computed('_column.footer', function() {
    var result = this.get('_column.footer');
    if (result)
    {
      return result;
    }
    return '';
  }),

  style: Ember.computed('width', function() {
    return 'width:'+this.get('width')+'px;';
  })
});
