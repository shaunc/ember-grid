// ember-grid

import Ember from 'ember';
import layout from './template';
import ColumnModel from '../eg-column/model';
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

  _columnScrollerModel: null,

  _columns: Ember.computed(function(){ return Ember.A(); }),
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
  scrollNeeded: Ember.computed(
      'width', 'contentWidth', 'rowHeight', 'height', function() {
    const data = this.get('data') || [];
    let height = this.get('height');
    if (height == null && this.element != null) {
      height = this.$().height(); 
    }
    const needed = this.get('contentWidth') > this.get('width') || 
      this.get('rowHeight') * data.length > height;
    return needed;
  }),

  init: function() {
    this._super();
    this.set('_columnScrollerModel', ColumnScrollerModel.create({}));
  },

  attrsChanged: Ember.on('didReceiveAttrs', function() {
    this.setupColumns();
    let data = this.setupData();
    this._refreshColumns(data);
  }),
  setupColumns() {
    let acolumns = this.getAttr('columns');
    if (typeof acolumns === 'string') {
      acolumns = acolumns.split(',').map( name => {return {key: name};}  );
    }
    if (acolumns != null ) {
      const columns = this.get('columns');
      acolumns.forEach((col)=>{
        if(!(col instanceof columnModel)) {
          col = ColumnModel.create(col);
        }
        columns.pushObject(col);
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
      this.set('data', data);
      var self = this;
      dataPromise.then(resolvedData => {
        if (this.get('data') === dataPromise) {
          self.set("data", resolvedData);
        }
      });
    }
    return data;
  },
  _refreshColumns(data) {
    this.get('_columns').forEach( column => { 
      this.refreshColumn(column, data); });
  },
  refreshColumn(column, data) {
    if(data == null) {
      data = this.get('data') || [];
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

    const setLimit = ()=>{
      let height = this.$().height(),
        limit = Math.ceil(height / rowHeight) + 10;
      body.set('limit', limit);
    }
    if(this.element != null) { 
      setLimit(); 
    }
    else {
      Ember.run.scheduleOnce('afterRender', setLimit);
    }
  },
  /**
   *  Add a column, either appending if new key, or merging if key
   *  present. Returns promise for the column that ends up in the collection.
   *
   *  Unfortunately, will get deprecation ember-views.render-double-modify
   *  if we modify _columns during prerender, so delay action till afterRender.
   */
  addColumn(column) {
    return new Promise((res)=>{
      Ember.run.scheduleOnce('afterRender',()=>{
        const key = column.get('key');
        const columns = this.get('_columns');
        const rcolumn = columns.reduce(function(found, col){
          return found || (col.get('key') === key ? col : null);
        }, null);
        if(rcolumn == null) {
          columns.pushObject(column);
        } else {
          rcolumn.merge(column)
          column = rcolumn
        }
        this.refreshColumn(column);
        res(column)
      });
    })

  },
});
