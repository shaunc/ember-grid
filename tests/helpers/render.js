// tests/helpers/render
//
// render support

import Ember from 'ember';

export function renderTemplate(context, params, block) {
  var paramStr = [];
  for(let key in params) {
    paramStr.push(`${key}=${key}`);
  }
  paramStr = paramStr.join(' ');
  var template;
  if (block == null) {
    template = `{{ember-grid ${paramStr} }}`;
  } else {
    template = `{{#ember-grid ${paramStr} }}
        ${block}
      {{/ember-grid}}`;
  }

  Ember.run(()=>{
    context.setProperties(params);
    context.render(Ember.Handlebars.compile(template));
  });
}

