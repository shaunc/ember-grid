// eg-if-empty

import Ember from 'ember';
import PortalDeclaration from 'ember-declarative/decl/ed-portal/mixin';
import layout from './template';

export default Ember.Component.extend(PortalDeclaration, {
  layout: layout,
});
