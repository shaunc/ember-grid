import Ember from 'ember';
import EmberGrid from './ember-grid';
import layout from './eg-column/template';
import ColumnModel from '../eg-column/model';

export default Ember.Component.extend({
  layout: layout,
	classNames: ['column-def'],

	_column: null,

	init: function() {
		this._super.apply(this, arguments);
		this._column = ColumnModel.create({});
		this._column.key = this.elementId;
	},

	didReceiveAttrs: function() {
		this._super();
		Ember.run.next(this, function() {
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
	    this.get('element').style.display = 'none';
	  });
	}

});
