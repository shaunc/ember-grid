// eg-header

import Ember from 'ember';
import EmberGridColumn from '../eg-column/component';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,

  _header: null,
  _column: Ember.computed.alias('parentView._column'),

  didReceiveAttrs() {
    this._super();
    var header = this._header;
    if (header == null) {
      header = this._header = Ember.Object.create({});
    }
    for (let key in this.attrs) {
      header[key] = this.getAttr(key);
    }
  },
  willRender() {
    var parentView = this.get('parentView');
    if (parentView instanceof EmberGridColumn) {
      var header = this._header;
      if (parentView._column._zones.header !== header) {
        parentView._column._zones.header = header;
      }
    }
	},
  didRender() {
    this._header.element = this.element;
  }

});
