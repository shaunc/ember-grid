// ember-grid

import Ember from 'ember';
import layout from './template';
import ColumnModel from '../eg-column/model';
import EGColumn from '../eg-column/component';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';
import ColumnScrollerModel from '../eg-render/column-scroller/model';
import DeclarationContainer from 'ember-declarative/ed-container/mixin';

const Promise = Ember.RSVP.Promise;

export default Ember.Component.extend(CspStyleMixin, DeclarationContainer, {
  layout: layout,
  classNames: ['ember-grid'],
  styleBindings: ['width[px]', 'height[px]'],
  classNameBindings: [
    'showHeader:with-header:without-header',
    'showFooter:with-footer:without-footer',
    'nativeScroll:native-scroll',
    'tooWide:horizontal-scroll'],

  showHeader: true,
  showFooter: false,

  width: null,          // total width of element
  bodyWidth: null,      // inside width of element
  /*contentWidth*/      // width of all columns
                        // column scrolling if more than body width

  height: null,         // total height of element
  bodyHeight: null,     // height to display body (inside height
                        // minus header and footer total height).
  rowHeight: 25,        // height of each row in body.

  tooWide: Ember.computed('contentWidth', 'width', function(){
    return this.get('contentWidth') > this.get('width');
  }),

  nativeScroll: Ember.computed.alias('_columnScrollerModel.nativeScroll'),

  columnWidthAuto: Ember.computed('_columns.[]', function(){
    var columns = this.get('_columns');
    if (columns == null ) { return 0; }
    return columns.reduce(((r, col)=>
      r + (col.get('width') == null || col.get('autoWidth'))), 0);
  }),

  contentWidth: Ember.computed('_columns.@each.width', function(){
    var columns = this.get('_columns');
    if (columns == null ) { return 0; }
    return columns.reduce(((r, col)=>r + (col.get('width') || 0)), 0);
  }),
  scrollNeeded: Ember.computed(
      'bodyWidth', 'contentWidth', 'rowHeight', 'bodyHeight', function() {
    const data = this.get('_data') || [];
    const height = this.get('bodyHeight');
    const width = this.get('bodyWidth');
    if (height == null || width == null) {
      return null;
    }
    const needed = this.get('contentWidth') > width || 
      this.get('rowHeight') * data.length > height;
    return needed;
  }),

  _columnScrollerModel: null,
  _columns: null,
  _data: null,                    // data or resolved data if data is promise
  _declarationsProcessed: false,

  init: function() {
    this._super();
    this.set('_columnScrollerModel', ColumnScrollerModel.create({}));
  },

  attrsChanged: Ember.on('didReceiveAttrs', function() {
    if(!this.get('_declarationsProcessed')) { return; }

    this.updateColumns();
    this.setupData();
    this._refreshColumns();
  }),
  updateColumns() {
    this.set('bodyWidth', null);
    this.set('bodyHeight', null);
    // XXX TODO: new data will override data from explicit column
    // declaration, but no way to tell data source currently
    // as only merged object is saved.
    const acolumns = this._unpackColumnAttribute();
    if (acolumns != null ) {
      const columns = this.get('_columns');
      acolumns.forEach((col)=>{
        if(!(col instanceof ColumnModel)) {
          col = ColumnModel.create(col);
        }
        let oldColumn = null;
        columns.some(function(currentColumn){ 
          if(currentColumn.get('key') === column.key) {
            oldColumn = currentColumn;
            return true;
          }
          return false;
        });
        if(oldColumn != null) {
          oldColumn.merge(acolumn);
        }
        else {
          columns.pushObject(col);
        }
      });
    }
  },
  setupData() {
    let data = this.getAttr('data');
    // Handle data being a promise.
    if (data.then && typeof data.then === 'function')
    {
      var dataPromise = data;
      data = [];
      var self = this;
      dataPromise.then(resolvedData => {
        if (this.get('data') === dataPromise) {
          self.set("_data", resolvedData);
        }
      });
    }
    this.set('_data', data);
  },
  processDeclarations: Ember.on('allDeclarationsRegistered', function(){
    const columns = this.get('declarations')
      .filter(decl => decl instanceof EGColumn)
      .map(decl => decl.get('_column'));
    const columnMap = columns.reduce((map, col, icol)=>{
      map[col.key] = icol;
      return map;
    }, {});
    const acolumns = this._unpackColumnAttribute();
    acolumns.forEach(acol=>{
      const icol = columnMap[Ember.get(acol, 'key')];
      if(icol != null) {
        // explicitly specified overrides, and should also be
        // final object so we don't have to change EGColumn instance.
        const col = columnMap[icol];
        acol.merge(col);
        col.merge(acol);
      } else {
        columns.push(acol);
      }
    });
    Ember.run.scheduleOnce('afterRender', ()=>{
      this.set('_columns', columns);
      this.setupData();
      this._refreshColumns();
      this.set('_declarationsProcessed', true);
    });
  }),
  _refreshColumns() {
    let needsDistribute = false
    const columns = this.get('_columns');
    const data = this.get('_data');
    this.get('_columns').forEach( column => { 
      this.refreshColumn(column, data); 
      if(column.get('autoWidth')) {
        needsDistribute = true;
      }
    });
    if(needsDistribute) {
      Ember.run.scheduleOnce('afterRender', this, 'distributeWidthToColumns');
    }
  },
  refreshColumn(column, data) {
    if(data == null) {
      data = this.get('_data') || [];
    }
    var body;
    if (column._zones.body == null) {
      body = Ember.Object.create({});
      Ember.set(column, '_zones.body', body);
    }
    else {
      body = column.get('_zones.body');
    }
    const rowHeight = this.get('rowHeight');
    body.set('data',  data);
    body.set('rowHeight', rowHeight);
    if (column.get('width') == null) {
      column.set('autoWidth', true);
    }

    const setDimensionRelated = ()=>{
      let height = this.$().height(),
        limit = Math.ceil(height / rowHeight) + 10;
      body.set('limit', limit);
    }
    if(this.element != null) { 
      setDimensionRelated(); 
    }
    else {
      Ember.run.scheduleOnce('afterRender', setDimensionRelated);
    }
  },
  /**
   *  Distribute actual width to columns whose width wasn't explicitly
   *  specified. Explicitly specified minimum and maximum are
   *  also taken into account. This may result in total column width
   *  not matching current width.
   *
   */
  distributeWidthToColumns() {
    const width = this.$().width();
    const columns = this.get('_columns');
    const autoMin = [];
    const autoMax = [];
    const [nfixed, fixed] = columns.reduce(([nfixed, fixed], col)=>{
      if (!col.get('autoWidth')) {
        nfixed += 1;
        fixed += col.get('width');
      }
      else {
        autoMin.push(col.get('min-width') || 10);
        autoMax.push(col.get('max-width') || 100000);
      }
      return [nfixed, fixed];
    }, [0, 0]);
    const nauto = columns.length - nfixed;
    if (nauto == 0) { return; }
    let awidth = width / nauto;
    let excess = 0;
    autoMin.forEach( cmin=>{ excess -= Math.max(cmin - awidth, 0); });
    autoMax.forEach( cmax=>{ excess += Math.max(awidth - cmax, 0); });
    awidth = (width + excess) / nauto;
    columns.forEach(column => {
      if(column.get('autoWidth')) {
        const cmin = column.get('min-width') || 10;
        const cmax = column.get('max-width') || 100000;
        column.set('width', 
          Math.min(cmax, Math.max(cmin, awidth)));
      }
    });
  },
  didRender() {
    if(!this.get('_declarationsProcessed')) { return; }
    if(this.get('bodyWidth') == null || this.get('bodyHeight') == null) {
      Ember.run.scheduleOnce('afterRender', ()=>{
        this.set('bodyWidth', Math.floor(this.$().innerWidth()));
        this.set('bodyHeight', 
          Math.floor(this.$().innerHeight())
            - Math.ceil(this.$('.header').height())
            - Math.ceil(this.$('.footer').height()))
        console.log('component rendered', this.get('bodyWidth'), this.get('bodyHeight'))
      });
    }
  },
  _unpackColumnAttribute() {
    let acolumns = this.getAttr('columns');
    if (typeof acolumns === 'string') {
      acolumns = acolumns.split(',').map( 
        name => ColumnModel.create({key: name}) );
    }
    return acolumns || [];
  }
});
