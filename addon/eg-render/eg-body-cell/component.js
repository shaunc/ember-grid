// eg-render/eg-body-cell

import Ember from 'ember';
import layout from './template';

import CspStyleMixin from 'ember-grid/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,
  classNames: ['cell', 'eg-body-cell'],
  classNameBindings: ['isOddRow:odd'],
  attributeBindings: ['rowIndex:data-row-index'],
  styleBindings: ['width[px]', 'rowHeight:height[px]'],

  _source: Ember.computed.alias('column._zones.body.source'),
  _data: Ember.computed.alias('column._zones.body.data'),

  width: Ember.computed.alias('column.width'),
  align: Ember.computed.alias('column.align'),

  isOddRow: Ember.computed('rowIndex', function() {
    return this.get('rowIndex') % 2 === 1;
  })
});
