/* globals _ */
// eg-column

import Ember from 'ember';
import EmberGrid from '../ember-grid/component';
import layout from './template';
import ColumnModel from './model';

export default Ember.Component.extend({
  layout: layout,

	_column: null,

	init() {
		this._super.apply(this, arguments);
    // receive attrs before init!
    if (this._column == null) {
  		this._column = ColumnModel.create({});
	   	this._column.key = this.elementId;
    }
	},

	didReceiveAttrs() {
		this._super();
    var column = this._column;
    if (column == null) {
      column = this._column = ColumnModel.create({});
    }
    for (let key in this.attrs) {
      column[key] = this.getAttr(key);
    }
  },
  willRender() {
    var parentView = this;
    while(parentView = parentView.get('parentView')) {
      if (!(parentView instanceof EmberGrid)) {
        continue;
      }
      var column = this._column;
      var parentColumn = _.find(parentView._columns, {key: this._column.key});
      if (parentColumn == null) {
        parentView._columns.push(column);
      } else {
        var async = [];
        for (let key in column) {
          if (key !== '_zones' || parentColumn[key] == null) {
            if (parentColumn.get(key) == null) {
              parentColumn[key] = column[key]; 
            }
            else {
              // if any are already set, we need another render cycle
              // to change the value.
              async.push(key);
            }
          }
          if (async.length > 0) {
            Ember.run.scheduleOnce('afterRender', ()=>{
              for (let key in async) {
                parentColumn.set(key, column[key]);
              }
            });
          }
        }
      }
      break;
    }
	}

});
