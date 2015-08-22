// dummy/components/display-template/component.js

import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,

  didReceiveAttrs() {
    this._super();
    var templateString = this.getAttr('template');
    var pre = Ember.String.htmlSafe(
      templateString.replace(/{{/g, '{ {').replace(/</g, '&lt;'));
    this.set('template', pre);
  }

});