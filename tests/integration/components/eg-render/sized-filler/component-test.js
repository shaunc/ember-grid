import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('eg-render/sized-filler', 'Integration | Component | eg render/sized filler', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{eg-render/sized-filler}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#eg-render/sized-filler}}
      template block text
    {{/eg-render/sized-filler}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
