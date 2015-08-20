import Ember from 'ember';
import layout from './template';


export default Ember.Component.extend({
  layout: layout,
  classNames: ['cell', 'eg-body-cell'],
  classNameBindings: ['isOddRow:odd'],
  attributeBindings: ['style', 'rowIndex:data-row-index'],

  width: Ember.computed.alias('column.width'),
  align: Ember.computed.alias('column.align'),

  isOddRow: Ember.computed('rowIndex', function() {
    return this.get('rowIndex') % 2 === 1;
  }),

  style: Ember.computed('column.offset', 'width', function(){
    var {'column.offset': offset, width, rowHeight} = this.getProperties(
      'column.offset', 'width', 'rowHeight');
    if (!isNaN(offset)) {
      return Ember.String.htmlSafe(
        'display:inline-block; width:' + width + 
        'px; height:' + rowHeight + 'px');
    }
    else {
      return Ember.String.htmlSafe('display: none;');
    }
  })

});
