import Ember from 'ember';
import layout from '../templates/components/ember-grid';

export default Ember.Component.extend({
  layout: layout,
  columns: new Ember.A(),
  classNames: ['ember-grid'],

  _addColumn: function(column) {
   	this.columns.pushObject(column);
  }
});
