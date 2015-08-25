import Ember from 'ember';
import { moduleForComponent } from 'ember-qunit';
import { test } from '../../helpers/chai-assert';
import hbs from 'htmlbars-inline-precompile';
import { personTable500 } from '../../helpers/example-data';
import startApp from '../../helpers/start-app';
import { readElementDimensions } from '../../helpers/element';
import { addStyles, removeStyles } from '../../helpers/styles';


var columns = 'name,age,salary,email';
var template = hbs`
  {{ember-grid 
    data=data columns=columns
    height=height width=width rowHeight=rowHeight}}`;

var App;
moduleForComponent(
  'spec/defining-the-window/height', 
  'use ember-grid.height to control layout',
  { integration: true,
    beforeEach() {
      App = startApp();
    },
    afterEach() {
      removeStyles();
      Ember.run(App, App.destroy);
    }
  });


test('explicit height controls element height', function(assert) {
  var height = 400, data = personTable500, width;
  assert.expect(1);

  Ember.run(()=>{
    this.setProperties({height, data, columns, width});
    this.render(template);
  });
  andThen(()=>{
    var {height: elementHeight} = readElementDimensions(this, 'grid', 'height');
    assert.equal(elementHeight, height);
  });
});

test('undefined height, scroll, css fills to potential in parent', function(assert){
  var height, data = personTable500, width;
  assert.expect(1);

  Ember.run(()=>{
    // enclosing element gives us space to expand into
    addStyles({'> *': 'height: 400px;'});
    this.setProperties({height, data, columns, width});
    this.render(template);
  });
  andThen(()=>{
    var {height: elementHeight} = readElementDimensions(this, 'grid', 'height');
    assert.equal(elementHeight, 400);
  });

});

test('undefined height, scroll, explict css respected', function(assert){
  var height, data = personTable500, width;
  assert.expect(1);

  Ember.run(()=>{
    // explictly style element height
    addStyles({'.ember-grid': 'height: 300px;'});
    this.setProperties({height, data, columns, width});
    this.render(template);
  });
  andThen(()=>{
    var {height: elementHeight} = readElementDimensions(this, 'grid', 'height');
    assert.equal(elementHeight, 300);
  });

});