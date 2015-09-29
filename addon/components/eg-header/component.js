// eg-header

import Ember from 'ember';
import ColumnZone from '../eg-column/zone/mixin';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  zoneName: 'header'
});
