// dummy/display-template/component.js

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['display-template'],
  classNameBindings: ['isOpen:open'],

  isOpen: false,

  didReceiveAttrs() {
    this._super();
    for (let key in this.attrs) {
      this.set(key, this.getAttr(key));
    }
    var template = this.getAttr('templateString');
    if (template == null) { 
      template = '(missing template)';
    }
    else {
      if (template.string != null) {
        template = template.string;
      }
      template = template.replace(/</g, '&lt;');
    }
    this.set('templateString', Ember.String.htmlSafe(template));
  },
  actions: {
    toggle() {
      this.toggleProperty('isOpen');
    }
  }


});