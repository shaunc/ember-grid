// eg-render/eg-header

import Ember from 'ember';
import layout from './template';

import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,
  classNames: ['header'],
	classNameBindings: ['isDragging:dragging'],
  //styleBindings: ['width[px]'],
	
  isDragging: Ember.computed('draggingHeaderCell', function() {
  	return this.get('draggingHeaderCell') !== null;
  }),

  draggingHeaderCell: null,

  mouseUp: function() {
    this.set('draggingHeaderCell', null);
  },

  mouseLeave: function() {
    this.set('draggingHeaderCell', null);
  },

  mouseMove: function(event) {
    if(!this.get('isDragging')) {
      return;
    }

    var cell = this.get('draggingHeaderCell');
    var offset = cell.$().offset();
    var newWidth = event.pageX - offset.left;
    if (newWidth < 5) { newWidth = 5; }

    cell.set('width', newWidth);
  }

});
