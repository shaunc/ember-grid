import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('eg-render/eg-header-resize-handle', 'Integration | Component | eg render/eg header resize handle', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{eg-render/eg-header-resize-handle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#eg-render/eg-header-resize-handle}}
      template block text
    {{/eg-render/eg-header-resize-handle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
