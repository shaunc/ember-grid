// eg-render/eg-footer

import Ember from 'ember';
import layout from './template';

import CspStyleMixin from 'ember-grid/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,
  classNames: ['footer'],
  styleBindings: ['width[px]']
});
