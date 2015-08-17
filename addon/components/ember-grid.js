import Ember from 'ember';
import layout from './ember-grid/template';

export default Ember.Component.extend({
  layout: layout,
  columns: new Ember.A(),
  classNames: ['ember-grid'],

  _addColumn: function(column) {
   	this.columns.pushObject(column);
  }
});
