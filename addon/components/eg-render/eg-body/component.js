// eg-render/eg-body

import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['body'],

  topVisibleIndex: 0,
  bufferRowCount: 10,

  rowHeight: 25,

  rowCount: Ember.computed('data.[]', function() {
    return this.get('data').length;
  }),

  visibleRowCount: Ember.computed('height', 'rowHeight', function() {
    return Math.ceil(this.get('height') / this.get('rowHeight'));
  }),

  bottomVisibleIndex: Ember.computed('rowCount', 'topVisibleIndex', 'visibleRowCount', function() {
    return Math.min(this.get('rowCount')-1, this.get('topVisibleIndex') + this.get('visibleRowCount'));
  }),

  topBufferRowIndex: Ember.computed('topVisibleIndex', 'bufferRowCount', function() {
    return Math.max(0, this.get('topVisibleIndex') - this.get('bufferRowCount'));
  }),

  bottomBufferRowIndex: Ember.computed('rowCount', 'bottomVisibleIndex', 'bufferRowCount', function() {
    return Math.min(this.get('rowCount')-1, this.get('bottomVisibleIndex') + this.get('bufferRowCount'));
  }),

  sourceBodies: Ember.computed('columns.@each._zones.body', function(){
    return this.get('columns').map(
      function (col) { return Ember.get(col, '_zones.body'); });
  }),

  topFillHeight: Ember.computed('rowHeight', 'topBufferRowIndex', function() {
    return this.get('topBufferRowIndex') * this.get('rowHeight');
  }),

  bottomFillHeight: Ember.computed('rowHeight', 'rowCount', 'bottomBufferRowIndex', function() {
    return (this.get('rowCount') - 1 - this.get('bottomBufferRowIndex')) * this.get('rowHeight');
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

  visibleRows: Ember.computed('topBufferRowIndex', 'bottomBufferRowIndex', function() {
    var startIndex = this.get('topBufferRowIndex');
    var endIndex = this.get('bottomBufferRowIndex');

    var result = [];
    while(startIndex <= endIndex){
       result.push(startIndex++);
    }
    return result;
  }),

  bindScroll: Ember.on('didUpdate', function() {
    Ember.run.later(function() {
      if (this.scrollBound) { return; }
      var scrollable = this.$('.scrollable');
      if (scrollable[0]) {
        scrollable.on('scroll', this.didScroll.bind(this));
        this.scrollBound = true;
      }
    }.bind(this));
  }),

  unbindScroll: Ember.on('willDeleteElement', function() {
    this.$('.scrollable').off('scroll', this.didScroll.bind(this));
    this.scrollBound = false;
  }),

  didScroll(/*event*/) {
    Ember.run.debounce(this, this.scrollTo, 10);
  },

  scrollTo() {
    this.set('topVisibleIndex', Math.trunc(this.$('.scrollable')[0].scrollTop / this.get('rowHeight')));
  }

});
