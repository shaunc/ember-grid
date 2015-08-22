// dummy/app/application/controller

import Ember from 'ember';

export default Ember.Controller.extend({
  gallery: [
    { section: 'General', examples: ['simple']},
    { section: 'Layout & Scrolling', examples: [] },
    { section: 'Text columns', examples: [] },
    { section: 'Header & footer', examples: [] },
    { section: 'Column Attributes', examples: [] },
    { section: 'Body', examples: [] },
  ],
  columns: [1, 2, 3],
  getRoute(row, rowIndex, {key}) {
    var example = row.examples[key];
    if (example == null) { return null; }
    if (typeof example === 'string') {
      example = { name: example };
    }
    if (example.title == null) {
      example.title = example.toUpperCase() + example.slice(1);
    }
    return example;
  }
});

