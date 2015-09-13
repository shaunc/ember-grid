// eg-render/eg-body

import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['body'],

  topVisibleIndex: 0,
  bufferRowCount: 10,

  rowHeight: 25,

  rowCount: Ember.computed('data', function() {
    return this.get('data').length;
  }),

  bottomVisibleIndex: Ember.computed('rowCount', 'topVisibleIndex', function() {
    return Math.min(this.get('rowCount'), this.get('topVisibleIndex') + 2);
  }),

  topBufferRowIndex: Ember.computed('topVisibleIndex', 'bufferRowCount', function() {
    return Math.max(0, this.get('topVisibleIndex') - this.get('bufferRowCount'));
  }),

  bottomBufferRowIndex: Ember.computed('rowCount', 'bottomVisibleIndex', 'bufferRowCount', function() {
    return Math.min(this.get('rowCount'), this.get('bottomVisibleIndex') + this.get('bufferRowCount'));
  }),

  sourceBodies: Ember.computed('columns.@each._zones.body', function(){
    return this.get('columns').map(
      function (col) { return Ember.get(col, '_zones.body'); });
  }),

  topFillHeight: Ember.computed('rowHeight', 'topBufferRowIndex', function() {
    return this.get('topBufferRowIndex') * this.get('rowHeight');
  }),

  bottomFillHeight: Ember.computed('rowHeight', 'rowCount', 'bottomBufferRowIndex', function() {
    return (this.get('rowCount') - this.get('bottomBufferRowIndex') - 1) * this.get('rowHeight');
  }),

  requiredPresent: Ember.computed(
    'attrs.data', 'attrs.columns', 'attrs.height', 'attrs.width', 
    'attrs.contentWidth', 'attrs.rowHeight', function() {
      if (this.getAttr('data') == null) { return false; }
      if (this.getAttr('columns') == null) { return false; }
      if (this.getAttr('height') == null) { return false; }
      if (this.getAttr('width') == null) { return false; }
      if (this.getAttr('rowHeight') == null) { return false; }
      return true;
    }),

  actions: {
    scrollSource: function (offset, limit) {
      var bodies = this.get('sourceBodies') || [];
      this.setProperties({offset, limit});
      Ember.run.debounce(function() { 
        bodies.map( function(body){
          if (body != null) {
            Ember.set(body, 'offset', Math.max(offset - 30, 0));
            Ember.set(body, 'limit', limit + 30);
          }
        });
      }, 100);

    }
  }
});
