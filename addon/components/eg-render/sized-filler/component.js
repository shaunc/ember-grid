import Ember from 'ember';
import layout from './template';

import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,
  tagName: 'div',
  classNames: 'filler',
  styleBindings: ['height[px]', 'width[px]'],

  didReceiveAttrs() {
  	this._super();
  	var height = this.getAttr('height');
    this.set('height', height);
    var width = this.getAttr('width');
    this.set('width', width);
  }
});
