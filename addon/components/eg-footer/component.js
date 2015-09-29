// eg-footer

import Ember from 'ember';
import PortalDeclaration from 'ember-declarative/decl/ed-portal/mixin';
import ColumnZone from '../eg-column/zone/mixin';
import layout from './template';

export default Ember.Component.extend(PortalDeclaration, ColumnZone, {
  layout: layout,
  zoneName: 'footer'
});
