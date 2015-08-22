// component eg-render/eg-body-cell

import Ember from 'ember';
import layout from './template';


export default Ember.Component.extend({
  layout: layout,
  classNames: ['cell', 'eg-body-cell'],
  classNameBindings: ['isOddRow:odd'],
  attributeBindings: ['style', 'rowIndex:data-row-index'],

  _source: Ember.computed.alias('_column._zones.body.source'),
  _data: Ember.computed.alias('_column._zones.body.data'),

  width: Ember.computed.alias('_column.width'),
  align: Ember.computed.alias('_column.align'),

  isOddRow: Ember.computed('rowIndex', function() {
    return this.get('rowIndex') % 2 === 1;
  }),

  style: Ember.computed('width', 'rowHeight', function(){
    var {width, rowHeight} = this.getProperties('width', 'rowHeight');
    return Ember.String.htmlSafe(
      'width:' + width + 
      'px; height:' + rowHeight + 'px');
  })

});
