// component eg-column

import Ember from 'ember';
import EmberGrid from '../ember-grid/component';
import layout from './template';
import ColumnModel from '../../eg-column/model';

export default Ember.Component.extend({
  layout: layout,

	_column: null,

	init: function() {
		this._super.apply(this, arguments);
		this._column = ColumnModel.create({});
		this._column.key = this.elementId;
	},

	didReceiveAttrs: function() {
		this._super();
		Ember.run.scheduleOnce('afterRender', this, function() {
			this.get('_column').setProperties(this.attrs);
		});
	},

  didInsertElement: function() {
    this._super.apply(this, arguments);
  	Ember.run.next(this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGrid) {
	    	parentView._addColumn(this.get('_column'));
	    }
	  });
	}

});
