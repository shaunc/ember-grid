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
  	var height = this.attrs.height;
  	// deal with mutable
  	if (height && height.value !== undefined) {
	    height = height.value;
	  }
    this.set('height', height);
    var width = this.attrs.width;
    // deal with mutable
    if (width && width.value !== undefined) {
      width = width.value;
    }
    this.set('width', width);
  }
});
