// ember-grid

import Ember from 'ember';
import layout from './template';
import Column from '../eg-column/model'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['ember-grid'],
  attributeBindings: ['style'],

  showHeader: true,
  showFooter: false,

  columns: null,

  style: Ember.computed('bodyWidth', function() {
    var bodyWidth = this.get('bodyWidth');
    if (bodyWidth == null) { return null; }
    return Ember.String.htmlSafe('width:'+bodyWidth+'px;');
  }),

  bodyWidth: Ember.computed.alias('width'),
  contentWidth: Ember.computed( 'columns.[]', 'columns.{width}', {
    get() {
      var columns = this.get('columns');
      if (columns == null || columns.length === 0) { return 0; }
      var w = columns.reduce(((r,col)=> r + col.get('width')), 0);
      return w;
    },
    set(k, v) {
      return v;
    }
  }),
  columnsWithoutWidth: Ember.computed('columns', function(){
    return this.get('columns').reduce(((r, col)=>r + (col.width == null)), 0);
  }),
  init: function() {
    this._super();
    // XXX didReceiveAttrs can be called before init!
    if (this.get('columns') == null) {
      this.set('columns', new Ember.A([]));
    }
  },

  didReceiveAttrs() {
    this._super();
    var columns = this.getAttr('columns');
    if (typeof columns === 'string') {
      columns = columns.split(',').map( name => {return {key: name}}  );
    }
    if (columns == null) {
      this.set('columns', new Ember.A());
    } else {
      columns = columns.map( 
        col => col instanceof Column ? col : Column.create(col) );
      this.set('columns', columns);
    }
    var [
      height, width, rowHeight, headerHeight, footerHeight, 
      scrollX, scrollY, showHeader, showFooter, data
    ] = [
      'height', 'width', 'rowHeight', 'headerHeight', 'footerHeight',
      'scrollX', 'scrollY', 'showHeader', 'showFooter', 'data'
    ].map( (attr)=>this.getAttr(attr));

    rowHeight = rowHeight || 25;
    showHeader = showHeader || this.get('showHeader');
    showFooter = showFooter || this.get('showFooter');
    headerHeight = headerHeight || (showHeader ? 25 : 0);
    footerHeight = footerHeight || (showFooter ? 25 : 0);
    data = data || [];
    this.setProperties({
      height, width, rowHeight, headerHeight, footerHeight, 
      scrollX, scrollY, showHeader, showFooter, data      
    });
    this._setupLayout();
    var self = this;
    this.columns.forEach( column => { self._refreshColumn(column); });
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
      var bodyHeight = rowHeight * data.length;
      this.set('bodyHeight', bodyHeight);
      this.set('height', bodyHeight + headerHeight + footerHeight);
    } else {
      this.set('bodyHeight', height - headerHeight - footerHeight);
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
  },

  _addColumn: function(column) {
   	this.columns.pushObject(column);
    this._refreshColumn(column);
  },
  didRender() {
    var {width, columnsWithoutWidth, scrollX} = this.getProperties(
      'width', 'columnsWithoutWidth');
    if(width == null || columnsWithoutWidth > 0) {
      Ember.run.next(this, 'adjustWidth');
    }
  },
  adjustWidth() {
    var {width, columnsWithoutWidth} = this.getProperties(
      'width', 'columnsWithoutWidth');
    if (columnsWithoutWidth > 0) {
      this.calcContentWidth(width, columnsWithoutWidth);
    }
    if (this.get('width') == null) {
      this.set('width', this.get('contentWidth'));
    }
  },

  calcContentWidth(width, columnsWithoutWidth) {
    if (width == null) {
      width = this.readElementWidth();
    }
    if (width == null) { return; }
    var colWidth = width / columnsWithoutWidth;
    var columns = this.get('columns');
    var contentWidth = 0;
    columns.forEach((col)=>{
      if(col.width == null) {
        col.set('width', colWidth);
      }
      contentWidth += col.width;
    });
    this.set('contentWidth', contentWidth);
  },
  readElementWidth() {
    var element = this.element;
    if (element == null) { return; }
    var width = this.element.width;
    if (!width) {
      this.element.style.width = '100%';
      this.element.style.boxSizing = 'border-box';
      width = this.element.offsetWidth;
      this.element.style.width = null;
      this.element.style.boxSizing = null;
    }
    return width;
  }

});
