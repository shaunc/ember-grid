import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

import ColumnModel from 'ember-grid/eg-column/model';

moduleForComponent('eg-render/eg-body-cell', 'Integration | Component | eg render/eg body cell', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('column', ColumnModel.create({}));

  this.render(hbs`{{eg-render/eg-body-cell column=column}}`);

  // Template block usage:
  this.render(hbs`
    {{#eg-render/eg-body-cell}}
      template block text
    {{/eg-render/eg-body-cell}}
  `);

  expectElement('.cell', 1, {contains: 'template block text'});
});
