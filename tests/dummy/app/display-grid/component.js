// dummy/display-grid/component.js

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['display-grid'],

  didReceiveAttrs() {
    this._super();
    var options = this.getAttr('options');
    for (let key in options) {
      this.set(key, options[key]);
    }
    this.set('title', this.getAttr('title'));
    var templateString = this.getAttr('template');
    if (templateString == null) { 
      templateString = '(missing template)';
    }
    this.set('template', templateString);
    var outerTemplateString = `
      {{display-template template=template }}
      <div class='display'>
        <h3>{{name}}</h3>
        ${templateString}
      </div>`;
    this.set('layout', Ember.Handlebars.compile(outerTemplateString));
    Ember.run(this, 'rerender');
  }


});