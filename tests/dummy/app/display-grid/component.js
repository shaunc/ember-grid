// dummy/component/display-template/component.js

import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this._super();
    for (let key in this.attrs) {
      this.set(key, this.getAttr(key));
    }
    var templateString = this.getAttr('template');
    if (templateString == null) { 
      templateString = '(missing template)';
    }
    this.set('template', templateString);
    var outerTemplateString = `
      <h3>{{name}}</h3>
      {{display-template template=template}}
      <div class='display'>
        <h3>Result</h3>
        ${templateString}
      </div>`;
    this.set('layout', Ember.Handlebars.compile(outerTemplateString));
    Ember.run(this, 'rerender');
  }


});