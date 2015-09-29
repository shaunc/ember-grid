// eg-body

import Ember from 'ember';
import PortalDeclaration from 'ember-declarative/decl/ed-portal/mixin';
import ColumnZone from '../eg-column/zone/mixin';
import layout from './template';

export default Ember.Component.extend(PortalDeclaration, ColumnZone, {
  layout: layout,
  portalElementClass: 'eg-body-cell',
	classNames: ['body-def'],
  zoneName: 'body',

  _data : Ember.computed.alias('_body.data'),

  _items: Ember.computed('_body.{data,offset,limit}', function() {
    const body = this.get('_body');
    const {data, offset, limit} = body;
    const {oldOffset, oldLimit, oldItems} = this;
    const end = offset + limit;
    const oldEnd = oldOffset + oldLimit;
    const jump = Math.max(
      Math.abs(offset - oldOffset), Math.abs(end - oldEnd));
    if (oldItems != null && jump * 4 < oldItems.length) {
      return oldItems;
    }
    const items = this.oldItems = data.slice(offset, offset + limit);
    this.oldOffset = offset;
    this.oldLimit = limit;
    return items;

  }),
  _requiredPresent: Ember.computed(
      '_body.{data,offset,limit}', function() {
    var body = this._body || {};
    var {data, offset, limit} = body;
    return data != null && offset != null && limit != null;
  }),
  attrsChanged: Ember.on('didReceiveAttrs', function() {
    const body = this.get('_body');
    if (this.getAttr('offset') == null) {
      Ember.set(body, 'offset', 0);
    }
    if (this.getAttr('limit') == null) {
      Ember.set(body, 'limit', 10);
    }
  }),
  /**
   *  Adjust porting element to reflect current offset.
   */
  portElement(receiver, idx) {
    idx -= this.get('_body.offset');
    return this._super(receiver, idx);
  },
  // XXX STUDY IF WORKING....
  putBackElement(receiver, idx) {
    idx -= this.get('_.body.offset');
    return this._super(receiver, idx);
  }
});
