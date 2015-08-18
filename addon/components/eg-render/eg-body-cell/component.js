import Ember from 'ember';
import layout from './template';


export default Ember.Component.extend({
  layout: layout,
  classNames: ['cell', 'eg-body-cell'],
  classNameBindings: ['isOddRow:odd'],
  attributeBindings: ['style', 'rowIndex:data-row-index'],

  width: Ember.computed.alias('column.width'),
  isOddRow: Ember.computed('rowIndex', function() {
    return this.get('rowIndex') % 2 === 1;
  }),

  style: Ember.computed('column.offset', 'width', function(){
    var {'column.offset': offset, width, rowHeight} = this.getProperties(
      'column.offset', 'width', 'rowHeight');
    if (!isNaN(offset)) {
      return Ember.String.htmlSafe(
        'display:inline-block; width:' + width + 
        'px; height:' + rowHeight + 'px');
    }
    else {
      return Ember.String.htmlSafe('display: none;');
    }
  }),

  willRender: function() {
    this._super.apply(this, arguments);
    if (this.element == null || this._oldRowIndex == null) { return; }
    var rowIndex = this.get('rowIndex');
    if (rowIndex !== this._oldRowIndex) {
      var source = this.get('column._zones.body.source');
      var sourceElement = source.getCellElement(this._oldRowIndex);
      this.moveChildren(this.element, sourceElement);
      this._oldRowIndex = null;
    }
  },

  didRender: function() {
    this._super.apply(this, arguments);
    var source = this.get('column._zones.body.source');
    var rowIndex = this.get('rowIndex');
    this._oldRowIndex = rowIndex;
    var sourceElement = source.getCellElement(rowIndex);
    this.moveChildren(sourceElement, this.element);
  },
  moveChildren: function (source, target) {
    if (source == null || target == null) { return; }
    while (source.childNodes.length > 0) {
      target.appendChild(source.childNodes[0]);
    }
  }
});
