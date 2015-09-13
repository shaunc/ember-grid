// eg-render/eg-footer-cell

import Ember from 'ember';
import layout from './template';
import { moveChildren } from 'ember-grid/utils/dom-util';

import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,

  classNames: ['cell'],
  styleBindings: ['width[px]'],

  _footer: Ember.computed.alias('_column._zones.footer'),
  align: Ember.computed.alias('_column.align'),
  width: Ember.computed.alias('_column.width'),

  didRender: function() {
    this._super();
 		this.renderFooter();
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
      moveChildren(sourceElement, destinationElement, true);
	  }
  },

  text: Ember.computed('_column.footer', function() {
    var result = this.get('_column.footer');
    if (result)
    {
      return result;
    }
    return '';
  })
});
