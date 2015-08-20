// component eg-header

import Ember from 'ember';
import EmberGridColumn from '../eg-column/component';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['header-def'],

  _column: Ember.computed.alias('parentView._column'),

  willInsertElement: function() {
    this._super.apply(this, arguments);

    var parentView = this.get('parentView');
    if (parentView instanceof EmberGridColumn) {
    	parentView.set('_column._zones.header', this.attrs);
    	parentView.set('_column._zones.header.element', this.get('element'));
    }
	  this.get('element').style.display = 'none';
	}

});
