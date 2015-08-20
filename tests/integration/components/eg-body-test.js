import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import generateData from 'dummy/utils/generate-data';

moduleForComponent('eg-body', 'Integration | Component | eg body', {
  integration: true
});

var data = generateData(10, {
    name: 'name', birthday: 'birthday' 
  }, 34234);


test('without required attributes, is blank.', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{eg-body}}`);

  assert.equal(this.$().text().trim(), '');

});

test('renders slice of cells for data', function (assert){
  var column = {key: 'name'};
  var offset = 3;
  var limit = 2;
  this.setProperties({column, data, offset, limit});
  this.render(hbs`{{eg-body column=column data=data offset=offset limit=limit}}`);
  assert.equal(this.$().text().trim(), '');
});
