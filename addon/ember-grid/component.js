// ember-grid

import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['ember-grid'],
  attributeBindings: ['style'],

  showHeader: true,
  showFooter: false,

  columns: null,

  style: Ember.computed('bodyWidth', function() {
    return Ember.String.htmlSafe('width:'+this.get('bodyWidth')+'px;');
  }),

  bodyWidth: Ember.computed.alias('width'),
  contentWidth: Ember.computed( 'columns.[]', function() {
    var columns = this.get('columns');
    if (columns == null || columns.length === 0) { return 0; }
    return columns.reduce(((r,col)=> r + col.width), 0);
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
    this.height = this.getAttr('height');
    this.width = this.getAttr('width');
    this.rowHeight = this.getAttr('rowHeight') |  25;
    this.headerHeight = this.getAttr('headerHeight') | (
      this.showHeader ? 25 : 0);
    this.footerHeight = this.getAttr('footerHeight') |  (
      this.showFooter ? 25 : 0);
    this.scrollX = this.getAttr('scroll-x');
    this.scrollY = this.getAttr('scroll-y');

    this.data = this.getAttr('data') ||  Ember.A([]);
    this._setupLayout();
    var self = this;
    this.columns.forEach(function(column) { 
      self._refreshColumn(column, offset); });
  },
  _setupLayout() {
    var { height, width, headerHeight, footerHeight, scrollX, scrollY } =
      this.getProperties(
        'height', 'width', 'headerHeight', 'footerHeight',
        'scrollX', 'scrollY');
    if (height == null) {
      if (scrollY == null) {
        this.set('scrollY', false);
      }
      var {data, rowHeight} = this.getProperties('data','rowHeight');
      var bodyHeight = this.bodyHeight = rowHeight * data.length;
      this.height = bodyHeight + headerHeight + footerHeight;
    } else {
      this.bodyHeight = height - headerHeight - footerHeight;
    }
    if (width == null) {
      if (scrollX == null) {
        this.set('scrollX', false);
      }
    }
  },

  _refreshColumn(column) {
    var body;
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
    body.setProperties({
      height: height,
      width: column.width,
      rowHeight: this.rowHeight,
      data: this.data,
      limit: limit
    });
    if(this.scrollX === false) {
      Ember.run.scheduleOnce(
        'afterRender', this, ()=>this.set('width', this.get('contentWidth'))
      );
    }
  },

  _addColumn: function(column) {
   	this.columns.pushObject(column);
    this._refreshColumn(column);
  }
});
