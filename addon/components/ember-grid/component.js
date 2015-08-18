import Ember from 'ember';
import layout from './template';

// XXX this is workaround for "didReceiveAttrs" called out of order.
var getMutValue = Ember.__loader.require('ember-htmlbars/hooks/get-value')['default'];

export default Ember.Component.extend({
  layout: layout,
  classNames: ['ember-grid'],
  attributeBindings: ['style'],

  style: Ember.computed('bodyWidth', function() {
    return 'width:'+this.get('bodyWidth')+'px;';
  }),

  columns: null,

  bodyWidth: Ember.computed.alias('width'),
  contentWidth: Ember.computed( 'columns.[]', function() {
    var columns = this.get('columns');
    if (columns == null || columns.length === 0) { return 0; }
    return columns.slice(-1)[0].offset;
  }),
  init: function() {
    this._super();
    this.columns = new Ember.A([]);
  },

  // Utility to get attribute value which may or may not be wrapped in mut helper.
  // returns defaultValue if attribute not defined or defined as null or undefined
  _maybeMutAttr(key, defaultValue) {
    if (this.attrs == null) { return defaultValue; }
    var obj = this.attrs[key];
    if (obj == null) { return defaultValue; }
    obj = getMutValue(obj);
    obj = (obj == null) ? defaultValue : obj;
    return obj;
  },
  didReceiveAttrs() {
    if (this.columns == null) {
      this.columns = new Ember.A();
    }
    this.height = this._maybeMutAttr('height', 0);
    this.width = this._maybeMutAttr('width', 0);
    this.rowHeight = this._maybeMutAttr('rowHeight', 0);
    this.headerHeight = this._maybeMutAttr('headerHeight', 0);
    this.footerHeight = this._maybeMutAttr('footerHeight', 0);
    this.bodyHeight = this.height - this.headerHeight - this.footerHeight;
    this.data = this._maybeMutAttr('data', Ember.A([]));
    var self = this;
    var offset = 0;
    this.columns.forEach(function(column) { 
      offset = self._refreshColumn(column, offset); });
  },
  _refreshColumn: function(column, offset) {
    var body;
    column.offset = offset;
    offset += (column.width | 0);
    if (column._zones == null) {
      Ember.set(column, '_zones', Ember.Object.create({}));
    }
    if (column._zones.body == null) {
      body = Ember.Object.create({});
      Ember.set(column._zones, 'body', body);
    }
    else {
      body = column._zones.body;
    }
    body.setProperties({
      height: this.get('bodyHeight'),
      width: column.width,
      rowHeight: this.rowHeight,
      data: this.data
    });
    return offset;
  },

  _addColumn: function(column) {
    var lastColumn = this.columns.slice(-1)[0];
    var lastOffset = 0;
    if (lastColumn != null) {
      lastOffset = lastColumn.offset + (lastColumn.width | 0);
    }
   	this.columns.pushObject(column);
    this._refreshColumn(column, lastOffset);
  }
});
