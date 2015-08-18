import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['header'],
  attributeBindings: ['style'],
	classNameBindings: ['isDragging:dragging'],
	
  isDragging: Ember.computed('draggingHeaderCell', function() {
  	return this.get('draggingHeaderCell') !== null;
  }),

  draggingHeaderCell: null,

  style: Ember.computed('width', function() {
    return 'width:'+this.get('width')+'px;';
  }),

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
