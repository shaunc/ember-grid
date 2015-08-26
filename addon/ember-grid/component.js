// ember-grid

import Ember from 'ember';
import layout from './template';
import Column from '../eg-column/model';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';
import potentialDimensions from 'ember-grid/utils/potential-dimensions';

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,
  classNames: ['ember-grid'],
  styleBindings: ['width[px]', 'height[px]'],

  showHeader: true,
  showFooter: false,

  _columns: null,
  width: null,
  height: null,
  bodyWidth: null,
  bodyHeight: null,

  columnsWithoutWidth: Ember.computed('columns', function(){
    var columns = this.get('_columns');
    if (columns == null ) { return 0; }
    return columns.reduce(((r, col)=>r + (col.width == null)), 0);
  }),

  init: function() {
    this._super();
    // XXX didReceiveAttrs can be called before init!
    if (this.get('_columns') == null) {
      this.set('_columns', new Ember.A([]));
    }
  },
  didReceiveAttrs() {
    this._super();
    var columns = this.getAttr('columns');
    if (typeof columns === 'string') {
      columns = columns.split(',').map( name => {return {key: name};}  );
    }
    if (columns == null) {
      columns = new Ember.A();
    } else {
      columns = columns.map( 
        col => col instanceof Column ? col : Column.create(col) );
    }
    this.set('_columns', columns);
    var [
      height, width, rowHeight,
      scrollX, scrollY, showHeader, showFooter, data
    ] = [
      'height', 'width', 'rowHeight',
      'scroll-x', 'scroll-y', 'showHeader', 'showFooter', 'data'
    ].map( (attr)=>this.getAttr(attr));

    rowHeight = rowHeight || 25;
    showHeader = showHeader || this.get('showHeader');
    showFooter = showFooter || this.get('showFooter');
    data = data || [];
    this.setProperties({
      height, width, rowHeight, 
      scrollX, scrollY, showHeader, showFooter, data      
    });
    columns.forEach( column => { this._refreshColumn(column); });
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
    this.get('_columns').pushObject(column);
    this._refreshColumn(column);
  },

  didRender() {
    Ember.run.next(()=>{
      this.adjustDimensions();
    });
  },

  /** 
   *
   * Adjust dimensions according to settings & available space
   *
   * 1) If height is missing:
   *   * If scroll-y is false, calculate size of body, then add
   *     header height and footer height for height.
   *   * If scroll-y is true or auto, use css height if set; otherwise
   *     measure potential height and use that.
   *
   * 2) If width is missing:
   *   * If column widths are all present, and scroll-y is not true,
   *     then width is sum of column widths.
   *      
   *   * If column widths are missing or scroll-y is true, potential
   *     width is measured and taken as width. Any columns without
   *     width are given width equal to display space, minimum 20.
   */
  adjustDimensions() {
    var {width, height} = this.getProperties('height', 'width');
    if (width == null || height == null) {
      let dimensions = potentialDimensions(this.element);
      if (height == null) {
        this.calculateHeight(dimensions);
      }
      if (width == null) {
        this.calculateWidth(dimensions);
      }
    }
    var {headerHeight, footerHeight} = this.getProperties('headerHeight', 'footerHeight');
    if (headerHeight == null) {
      headerHeight = this._actualHeaderHeight();
      this.set('headerHeight', headerHeight);
    }
    if (footerHeight == null) {
      footerHeight = this._actualFooterHeight();
      this.set('footerHeight', footerHeight);
    }
    var {bodyHeight, bodyWidth} = this.getProperties('bodyHeight', 'bodyWidth');
    if (bodyHeight == null) {
      bodyHeight = this.element.clientHeight;
      bodyHeight -= (this._actualBodyHeight() || 0); // should be just border
      bodyHeight -= headerHeight + footerHeight;
      this.set('bodyHeight', bodyHeight);
    }
    if (bodyWidth ==null) {
      this.set('bodyWidth', this.element.clientWidth);
    }
    this.get('_columns').forEach( column => { this._refreshColumn(column); });
  },

  calculateHeight(dimensions) {
    var element = this.element;
    var scrollY = this.get('scrollY');
    if (scrollY === false) {
      // no scroll - make body big enough to fit all content.
      let {data, rowHeight} = this.getProperties('rowHeight', 'data');
      if (data == null) { return; }
      let innerBodyHeight = data.length * rowHeight;
      let bodyElement = element.getElementsByClassName('body')[0];
      let bodyDimensions = potentialDimensions(bodyElement);
      let bodyBorderHeight = bodyDimensions.outer.height - bodyDimensions.inner.height;
      let bodyHeight = innerBodyHeight + bodyBorderHeight;
      this.set('bodyHeight', bodyHeight);
      // XXX reconsider if we support box-sizing: border-box
      //let ownBorderHeight = dimensions.outer.height - dimensions.inner.height;
      this.set('height', bodyHeight); // + ownBorderHeight);
    }
    else {
      // if our height is bigger than header and footer height,
      // use actual height; otherwise use potential height.
      let height, endHeight = 0;
      let headerHeight = this._actualHeaderHeight();
      if (this.get('headerHeight') == null) {
        this.set('headerHeight', headerHeight);
      }
      endHeight += headerHeight | 0;
      let body = element.getElementsByClassName('body')[0];
      endHeight += body.offsetHeight;
      let footerHeight = this._actualFooterHeight();
      if (this.get('footerHeight') == null) {
        this.set('footerHeight', footerHeight);
      }
      endHeight += footerHeight | 0;
      // XXX heuristic: if current internal height matches height of
      // internal contents (before display of data), we assume element
      // is "flexible" and use max height that will fit into parent.
      //
      // Otherwise, height may be given by css, so we leave it alone.
      if (element.clientHeight > endHeight) {
        height = element.clientHeight;
      } else {
        height = dimensions.outer.height;
      }
      this.set('height', height);
      this.set('bodyHeight', height - endHeight + body.offsetHeight);
    }
  },
  _actualHeaderHeight() {
    if (this.element == null) { return; }
    if (this.get('showHeader')) {
      let header = this.element.getElementsByClassName('header')[0];
      return header ? header.offsetHeight : null;
    }
    return 0;
  },
  _actualBodyHeight() {
    if (this.element == null) { return; }
    let body = this.element.getElementsByClassName('body')[0];
    return body ? body.offsetHeight : null;

  },
  _actualFooterHeight() {
    if (this.element == null) { return; }
    if (this.get('showFooter')) {
      let footer = this.element.getElementsByClassName('footer')[0];
      return footer ? footer.offsetHeight : null;
    }
    return 0;
  },

  calculateWidth(dimensions) {
    var element = this.element;
    var {scrollY, columnsWithoutWidth} = this.getProperties(
      'scrollY', 'columnsWithoutWidth');
    let columns = this.get('_columns');
    let contentWidth = columns.reduce(((r,col)=> r + col.get('width')), 0);
    if (scrollY !== true && columnsWithoutWidth === 0) {
      // body width is sum of column widths
      this.set('bodyWidth', contentWidth);
      this.set('width', contentWidth);
    } else {
      // body width derived from own width
      let bodyWidth = element.clientWidth;
      if (bodyWidth === 0) {
        bodyWidth = dimensions.inner.width;
      }
      this.set('bodyWidth', bodyWidth);
      this.set('width', bodyWidth);
      if (columnsWithoutWidth > 0) {
        var unusedWidth = Math.max(bodyWidth - contentWidth, 0);
        var colWidth = Math.max(10, unusedWidth / columnsWithoutWidth);
      }
      columns.forEach((col)=>{
        if (col.width == null) {
          Ember.set(col, 'width', colWidth);
        }
      });
    }
  }

});
