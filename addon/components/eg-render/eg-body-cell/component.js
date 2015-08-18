import Ember from 'ember';
import layout from './template';


export default Ember.Component.extend({
  layout: layout,
  classNames: ['cell', 'eg-body-cell'],
  attributeBindings: ['style', 'rowIndex:data-row-index'],

  width: Ember.computed.alias('column.width'),

  style: Ember.computed('column.offset', 'width', function(){
    var offset = this.get('column.offset');
    var width = this.get('width');
    if (!isNaN(offset)) {
      return Ember.String.htmlSafe(
        'display: inline-block; width: ' + width + 'px;');
    }
    else {
      return Ember.String.htmlSafe('display: none;');
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
