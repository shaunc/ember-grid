import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import ColumnModel from 'ember-grid/eg-column/model';

moduleForComponent('eg-render/eg-footer-cell', 'Integration | Component | eg-render/eg-footer-cell', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('column', ColumnModel.create({}));

  this.render(hbs`{{eg-render/eg-footer-cell column=column}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#eg-render/eg-footer-cell}}
      template block text
    {{/eg-render/eg-footer-cell}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
