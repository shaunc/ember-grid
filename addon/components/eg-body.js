import Ember from 'ember';
import EmberGridColumn from './eg-column';
import layout from './eg-body/template';

export default Ember.Component.extend({
  layout: layout,
	classNames: ['body-def'],

  _body: null,
  _column: Ember.computed.alias('parentView._column'),
  _items: Ember.computed('_body.{data,offset,limit}', function(){
    var {'_body.data': data, '_body.offset': offset, '_body.limit': limit} = this.getProperties(
      '_body.data', '_body.offset', '_body.limit');
    return (data || []).slice(offset, offset + limit);
  }),
  _requiredPresent: Ember.computed('_body.{data,height,width,rowHeight,offset,limit}', function(){
    var body = this._body || {};
    var {data, height, width, rowHeight, offset, limit} = body;
    return data != null && height != null && width != null && 
      rowHeight != null && offset != null && limit != null;
  }),
  contextDidChange: Ember.observer(
    '_data', '_body.{height,width,rowHeight,offset,limit}', function(){
      Ember.run.next(this, function(){ 
        this.rerender();
      });
  }),

  /**
   * Return field data for column given row index.
   *
   * @method field
   * @params rowIndex
   *
   */
  field: function(rowIndex) {
    var {'_column.key': key, '_body.data': data} = this.getProperties(
      '_column.key', '_body.data');
    return data[rowIndex][key];
  },
  didReceiveAttrs: function() {
    this._super();
    var body = this._body;
    if (body == null ) {
      body = Ember.Object.create({});
      this.set('_body', body);
    }
    Ember.merge(body, this.attrs);
    if (body._offset == null) {
      Ember.set(body, 'offset', 0);
    }
    if (body.limit == null && body.rowHeight != null && body.height != null) {
      Ember.set(body, 'limit', Math.ciel(body.height / body.rowHeight) + 10);
    }
  },
  didInsertElement: function() {
    this._super.apply(this, arguments);

  	Ember.run.next(this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGridColumn) {
        var columnBody = parentView.get('_column._zones.body');
        if( columnBody == null) {
          parentView.set('_column._zones.body', this._body);
          columnBody = this._body;
        }
        else {
          columnBody.setProperties(this._body);
          this.set('_body', columnBody);
        }
	    	Ember.set(columnBody, 'element', this.get('element'));
	    }
	    //this.get('element').style.display = 'none';
	  });
	}

});
