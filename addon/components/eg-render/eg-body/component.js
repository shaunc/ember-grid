import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['body'],

  sourceBodies: Ember.computed('columns.@each._zones.body', function(){
    return this.get('columns').map(
      function (col) { return Ember.get(col, '_zones.body'); });
  }),
  requiredPresent: Ember.computed(
    'attrs.data', 'attrs.columns', 'attrs.height', 'attrs.width', 
    'attrs.contentWidth', 'attrs.rowHeight', function() {
      if (this.getAttr('data') == null) { return false; }
      if (this.getAttr('columns') == null) { return false; }
      if (this.getAttr('height') == null) { return false; }
      if (this.getAttr('width') == null) { return false; }
      if (this.getAttr('contentWidth') == null) { return false; }
      if (this.getAttr('rowHeight') == null) { return false; }
      return true;
    }),
  actions: {
    scrollSource: function (offset, limit) {
      var bodies = this.get('sourceBodies') || [];
      Ember.run.debounce(function() { 
        bodies.map( function(body){
          if (body != null) {
            //Ember.set(body, 'offset', Math.max(offset - 60, 0));
            //Ember.set(body, 'limit', limit + 60);
          }
        });
      }, 500);
    }
  }
});
