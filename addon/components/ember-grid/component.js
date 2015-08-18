import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['ember-grid'],

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

  didReceiveAttrs() {
    this._super();
    if (this.columns == null) {
      this.columns = new Ember.A();
    }
    this.height = this.getAttr('height') |  0;
    this.width = this.getAttr('width') |  0;
    this.rowHeight = this.getAttr('rowHeight') |  0;
    this.headerHeight = this.getAttr('headerHeight') |  0;
    this.footerHeight = this.getAttr('footerHeight') |  0;
    this.bodyHeight = this.height - this.headerHeight - this.footerHeight;
    this.data = this.getAttr('data') ||  Ember.A([]);
    var self = this;
    var offset = 0;
    this.columns.forEach(function(column) { 
      offset = self._refreshColumn(column, offset); });
  },
  _refreshColumn: function(column, offset) {
    var body;
    Ember.set(column, 'offset', offset);
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
    var height = this.get('bodyHeight'), 
      limit = Math.ceil(height / this.rowHeight) + 10;
    console.log("SET DATA", this.data.length);
    body.setProperties({
      height: height,
      width: column.width,
      rowHeight: this.rowHeight,
      data: this.data,
      offset: 0,
      limit: limit
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
