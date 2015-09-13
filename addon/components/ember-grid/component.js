// ember-grid

import Ember from 'ember';
import layout from './template';
import ColumnModel from '../eg-column/model';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';
import potentialDimensions from 'ember-grid/utils/potential-dimensions';
import ColumnScrollerModel from '../eg-render/column-scroller/model'

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,
  classNames: ['ember-grid'],
  styleBindings: ['width[px]', 'height[px]'],
  classNameBindings: [
    'showHeader:with-header:without-header',
    'showFooter:with-footer:without-footer'],

  showHeader: true,
  showFooter: false,

  _columnScrollerModel: null,
  _columns: null,
  width: null,          // total width of element
  bodyWidth: null,      // inside width of element
  /*contentWidth*/      // width of all columns
                        // column scrolling if more than body width

  height: null,         // total height of element
  bodyHeight: null,     // height to display body (inside height
                        // minus header and footer total height).

  columnsWithoutWidth: Ember.computed('_columns.[]', function(){
    var columns = this.get('_columns');
    if (columns == null ) { return 0; }
    return columns.reduce(((r, col)=>r + (col.get('width') == null)), 0);
  }),

  contentWidth: Ember.computed('_columns.@each.width', function(){
    var columns = this.get('_columns');
    if (columns == null ) { return 0; }
    return columns.reduce(((r, col)=>r + (col.get('width') || 0)), 0);
  }),
  contentWidthDidChange: Ember.observer('contentWidth', function(){
    this.adjustDisplayWidth();    
  }),

  init: function() {
    this._super();
    // XXX didReceiveAttrs can be called before init!
    if (this.get('_columns') == null) {
      this.set('_columns', new Ember.A([]));
    }
    this.set('_columnScrollerModel', ColumnScrollerModel.create({}));
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
      columns = Ember.A(columns.map( 
        col => col instanceof ColumnModel ? col : ColumnModel.create(col) ));
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

    // Handle data being a promise.
    if (data.then)
    {
      var dataPromise = data;
      data = [];
      var self = this;
      dataPromise.then(resolvedData => {
        self.set("data", resolvedData);
      });
    }

    this.setProperties({
      height, width, rowHeight, 
      scrollX, scrollY, showHeader, showFooter, data      
    });
    columns.forEach( column => { this._refreshColumn(column); });
  },

  _refreshColumn(column) {
    var body;
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
    console.log('added column');
    this._refreshColumn(column);
  },

  didRender() {
    Ember.run.scheduleOnce('afterRender', ()=>{
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
   *
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
    var columnsWithoutWidth = this.get('columnsWithoutWidth');
    if (width == null || height == null || columnsWithoutWidth > 0) {
      let dimensions = potentialDimensions(this.element);
      // XXX TODO: if calculated, height and width should change
      // if input changes; but not if set explicitly
      if (height == null) {
        this.calculateHeight(dimensions);
      }
      if (width == null || columnsWithoutWidth > 0) {
        this.calculateWidth(dimensions, width);
      }
    }
    this.adjustContentDimensions();
  },

  adjustContentDimensions() {
    if(this.element == null) { return; }

    /*
     * The goal is to calculate how much room we have for body
     * content. The tricky part is the height. From the inner height
     * of the element, we need to remove the height of the footer
     * header and body border. However, we need to keep in mind
     * that the body border may overlap with the borders of header
     * and footer.
     *
     * TODO: take margin into account. Take scrollbar into account.
     */
    var newBodyHeight = this.element.clientHeight;
    newBodyHeight -= this._bodyShellHeight();

    this.set('bodyHeight', newBodyHeight);
    var bodyWidth = this.element.clientWidth;
    this.set('bodyWidth', bodyWidth);
    this.get('_columns').forEach( column => { this._refreshColumn(column); });
    this.adjustDisplayWidth();
  },
  adjustDisplayWidth() {
    // if (this.element == null) { return; }
    // var contentWidth = this.get('contentWidth');
    // var display = this.element.getElementsByClassName('display')[0];
    // display.style.width = (contentWidth - 2) + 'px';
  },

  _bodyShellHeight() {
    // calclulate the height of content except contents of body
    var headerStyle = this._actualHeaderStyle();
    var bodyStyle = this._actualBodyStyle();
    var footerStyle = this._actualFooterStyle();
    var _N = val=> val == null ? 0 : parseFloat(val);
    var shellHeight = 0;
    shellHeight += _N(headerStyle.offsetHeight) - _N(headerStyle.bottomBorderWidth);
    shellHeight += Math.max(
      _N(headerStyle.bottomBorderWidth), _N(bodyStyle.topBorderWidth));
    shellHeight += Math.max(
      _N(footerStyle.topBorderWidth), _N(bodyStyle.borderBottomWidth));
    shellHeight += _N(footerStyle.offsetHeight) - _N(footerStyle.topBorderWidth);
    return shellHeight;    
  },

  calculateHeight(dimensions) {
    var element = this.element;
    var scrollY = this.get('scrollY');
    this._setScroll('overflow-y', scrollY);
    if (scrollY === false) {
      // no scroll - make body big enough to fit all content.
      let {data, rowHeight} = this.getProperties('rowHeight', 'data');
      if (data == null) { return; }
      let innerBodyHeight = data.length * rowHeight;
      let bodyElement = element.getElementsByClassName('body')[0];
      let bodyDimensions = potentialDimensions(bodyElement);
      let bodyBorderHeight = bodyDimensions.outer.height - bodyDimensions.inner.height;
      let bodyHeight = innerBodyHeight + bodyBorderHeight;
      // XXX reconsider if we support box-sizing: border-box
      //let ownBorderHeight = dimensions.outer.height - dimensions.inner.height;
      this.set('height', bodyHeight); // + ownBorderHeight);
    }
    else {
      // if our height is bigger than header and footer height,
      // use actual height; otherwise use potential height.

      let height, shellHeight = this._bodyShellHeight();
      // XXX heuristic: if current internal height matches height of
      // internal contents (before display of data), we assume element
      // is "flexible" and use max height that will fit into parent.
      //
      // Otherwise, height may be given by css, so we leave it alone.
      if (element.clientHeight > Math.floor(shellHeight + 0.5)) {
        height = element.clientHeight;
      } else {
        height = dimensions.outer.height;
      }
      this.set('height', height);
    }
  },
  calculateWidth(dimensions, width) {
    var element = this.element;
    var {scrollX, columnsWithoutWidth} = this.getProperties(
      'scrollX', 'columnsWithoutWidth');
    if(scrollX != null) {
      this.element.style.scrollX = scrollX;
    }
    let columns = this.get('_columns');
    let contentWidth = columns.reduce((
      (r,col)=> r + (col.get('width') || 0)), 0);
    if (width == null && scrollX !== true && columnsWithoutWidth === 0) {
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
      if (width == null) {
        this.set('width', bodyWidth);
      }
      if (columnsWithoutWidth > 0) {
        var unusedWidth = Math.max(bodyWidth - contentWidth, 0);
        var colWidth = Math.max(10, unusedWidth / columnsWithoutWidth);
        columns.forEach((col)=>{
          if (col.width == null) {
            Ember.set(col, 'width', colWidth);
          }
        });
      }
    }
  },  
  _setScroll(cssProp, scroll) {
    if(scroll != null) {
      var scrollStyle;
      switch (scroll) {
        case true:
        case 'true':
          scrollStyle = 'scroll';
          break;
        case false:
        case 'false':
          scrollStyle = 'hidden';
          break;
      }
      if(scrollStyle != null) {
        this.element.style[cssProp] = scrollStyle;
      }
    }
  },
  _actualHeaderStyle() {
    return this._readElementStyle('header');
  },
  _actualBodyStyle() {
    return this._readElementStyle('body');
  },
  _actualFooterStyle() {
    return this._readElementStyle('footer');
  },
  _readElementStyle(name) {
    if (this.element == null) { return; }
    let sub = this.element.getElementsByClassName(name)[0];
    if (sub != null) {
      var style = window.getComputedStyle(sub);
      style.clientHeight = sub.clientHeight;
      style.offsetHeight = sub.offsetHeight;
      style.clientWidth = sub.clientWidth;
      style.offsetWidth = sub.offsetWidth;
      return style;
    }
    else {
      return {};
    }
  },

  tooWide: Ember.computed('width', 'contentWidth', function() {
    return this.get('contentWidth') > this.get('width');
  })

});
