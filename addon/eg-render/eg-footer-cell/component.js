// eg-render/eg-footer-cell

import Ember from 'ember';
import layout from './template';
import { moveChildren } from 'ember-grid/utils/dom-util';

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
      moveChildren(sourceElement, destinationElement);
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
    return Ember.String.htmlSafe('width:'+this.get('width')+'px;');
  })
});
