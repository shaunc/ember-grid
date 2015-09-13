// eg-if-empty

import Ember from 'ember';
import EmberGrid from '../ember-grid/component';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,

  _ifEmptyContainer: null,

  didReceiveAttrs() {
    this._super();
    var ifEmptyContainer = this._ifEmptyContainer;
    if (ifEmptyContainer == null) {
      ifEmptyContainer = this._ifEmptyContainer = Ember.Object.create({});
    }
    for (let key in this.attrs) {
      ifEmptyContainer[key] = this.getAttr(key);
    }
  },

  willRender() {
    var parentView = this.get('parentView');
    if (parentView instanceof EmberGrid) {
      var ifEmptyContainer = this._ifEmptyContainer;
      if (parentView._ifEmptyContainer !== ifEmptyContainer) {
        parentView._ifEmptyContainer = ifEmptyContainer;
      }
    }
	},
	
  didRender() {
    this._ifEmptyContainer.element = this.element;
  }

});
