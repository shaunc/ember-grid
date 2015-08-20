import Ember from 'ember';
import EmberGridColumn from '../eg-column/component';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
	classNames: ['body-def'],

  _body: null,

  _data: Ember.computed.alias('_body.data'),
  _column: Ember.computed.alias('parentView._column'),
  _items: Ember.computed('_body.{data,offset,limit,maxBuffer}', function() {
    var body = this.get('_body');
    var {data, offset, limit} = body;
    var {oldOffset, oldLimit, oldItems} = {this};
    var end = offset + limit;
    var oldEnd = oldOffset + oldLimit;
    var jump = Math.max(
      Math.abs(offset - oldOffset), Math.abs(end - oldEnd));
    if (oldItems != null && jump * 4 < oldItems.length) {
      console.log("old items", oldOffset, oldLimit, oldItems.length)
      return oldItems;
    }
    oldItems = this.oldItems = data.slice(offset, offset + limit);
    this.oldOffset = offset;
    this.oldLimit = limit;
    return oldItems;

  }),
  _requiredPresent: Ember.computed(
      '_body.{data,rowHeight,offset,limit}', function() {
    var body = this._body || {};
    var {data, height, width, rowHeight, offset, limit} = body;
    return data != null && height != null && width != null && 
      rowHeight != null && offset != null && limit != null;
  }),
  /**
   * Return DOM element for row index if currently rendered or null
   *
   * @params rowIndex
   *
   */
  getCellElement(rowIndex) {
    var element = this.element;
    if (element == null || element.childNodes == null) {
      self.rerender();
      return null;
    }
    var body = this.get('_body');
    var {data, offset, limit} = body;
    if (rowIndex < offset || rowIndex >= offset + limit) { return null; }
    return element.getElementsByClassName('eg-body-cell')[rowIndex - offset];
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
        Ember.set(columnBody, 'source', this);
	    }
	    this.get('element').style.display = 'none';
	  });
	}


});
