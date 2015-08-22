import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import ColumnModel from 'ember-grid/eg-column/model';

moduleForComponent('eg-render/eg-body-row', 'Integration | Component | eg render/eg body row', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('columns', [ ColumnModel.create({}) ]);

  this.render(hbs`{{eg-render/eg-body-row columns=columns}}`);

  // Template block usage:
  this.render(hbs`
    {{#eg-render/eg-body-row}}
      template block text
    {{/eg-render/eg-body-row}}
  `);

  expectElement('.row', 1, {contains: 'template block text'});
});
