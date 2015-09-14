// eg-render/eg-header

import Ember from 'ember';
import layout from './template';

import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,
  classNames: ['header'],
	classNameBindings: ['isDragging:dragging'],
	
  isDragging: Ember.computed('draggingHeaderCell', function() {
  	return this.get('draggingHeaderCell') !== null;
  }),

  draggingHeaderCell: null,

});
