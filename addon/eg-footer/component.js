// eg-footer

import Ember from 'ember';
import EmberGridColumn from '../eg-column/component';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,

  _footer: null,
  _column: Ember.computed.alias('parentView._column'),

  didReceiveAttrs() {
    this._super();
    var footer = this._footer;
    if (footer == null) {
      footer = this._footer = Ember.Object.create({});
    }
    for (let key in this.attrs) {
      footer[key] = this.getAttr(key);
    }
  },
  willRender() {
    var parentView = this.get('parentView');
    if (parentView instanceof EmberGridColumn) {
      var footer = this._footer;
      if (parentView._column._zones.footer !== footer) {
        parentView._column._zones.footer = footer;
      }
    }
  },
  didRender() {
    this._footer.element = this.element;
  }


});
