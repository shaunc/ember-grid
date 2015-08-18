import Ember from 'ember';
import layout from './eg-body-cell/template';

function formatStyle(x, y) {
  return 'position: absolute; top: 0; left: 0;' +
    ' -webkit-transform: translate('+x+'px, '+y+'px);' + 
    ' -moz-transform: translate('+x+'px, '+y+'px);' + 
    ' -ms-transform: translate('+x+'px, '+y+'px);' + 
    ' -o-transform: translate('+x+'px, '+y+'px);' + 
    ' transform: translate('+x+'px, '+y+'px);'
}

export default Ember.Component.extend({
  layout: layout,
  classNames: ['eg-body-cell'],
  attributeBindings: ['style'],

  style: Ember.computed('column.offset', function(){
    var offset = this.get('column.offset');
    var column = this.get('column');
    if (!isNaN(offset)) {
      return formatStyle(offset, 0); 
    }
    else {
      return 'display: none;'
    }
  }),

  didInsertElement: function() {
    this._super.apply(this, arguments);
    var element = this.element;
    var sourceElement = this.get('column._zones.body.element');
    if (sourceElement == null) { return; }
    var cellElement = $(sourceElement)
      .find('.eg-body-cell[data-row-index=' + this.get('rowIndex') + ']')[0];
    if (cellElement == null) { return; }
    while (cellElement.childNodes.length > 0) {
      element.appendChild(cellElement.childNodes[0]);
    }
  }
});
