// controller for examples

import Ember from 'ember';
import generateData from 'dummy/utils/generate-data';

export default Ember.Controller.extend({
  queryParams: ['name', 'next'],

  title: Ember.computed('name', function(){
    var name = this.get('name');
    return name[0].toUpperCase() + name.slice(1);
  }),
  // XXX rerender dynamically causes problems, perhaps because
  // we are changing the layout of the `grid-example` component.
  // explicitly transition through a blank state to
  // clear away old `grid-example` object.
  //
  // This is an ugly hack. A different solution would
  // be better.
  nextDidChange: Ember.observer('next', function(){ 
    if (this.get('next') != null) {
      var next = this.get('next');
      this.set('name', undefined);
      this.set('next', undefined);
      Ember.run.scheduleOnce('afterRender', ()=>{
        this.transitionToRoute(`/example?name=${next}`);
      });
    }
  }),
  _data: {
    default: generateData(500, {
      name: 'name', 
      age: {name: 'age', options: {type: 'adult'}},
      salary: {name: 'floating', options: {min: 0, max: 200000, fixed: 2}},
      email: {name: 'email', options: {domain: 'example.com'}}
      }, 4359),
      small: generateData(50, {
      name: 'name', 
      age: {name: 'age', options: {type: 'adult'}},
      salary: {name: 'floating', options: {min: 0, max: 200000, fixed: 2}},
      email: {name: 'email', options: {domain: 'example.com'}}
      }, 2349)
  },
  exampleDatasets: {
    minimal: 'small'
  },
  data: Ember.computed('name', '_data', 'exampleDatasets', function(){
    var dataset = this.exampleDatasets[this.get('name')] || 'default';
    return this._data[dataset];
  }),

  dollarSalary: function(row) {
    return '$'+row.salary.toFixed(2);
  },

  averageSalary: Ember.computed('gridRows.@each.salary', function() {
    var salaries = this.get('data').map(function(row) {return row.salary;});
    if (salaries)
    {
      var sum = salaries.reduce(function(a, b){return a+b;});
      return 'AVG $' + (sum / salaries.length).toFixed(2);
    }
    else
    {
      return null;
    }
  }),
  options: Ember.computed('data', function(){
    var options = {
      data: this.get('data'),
      dollarSalary: this.get('dollarSalary'),
      averageSalary: this.get('averageSalary')
    };
    return options;
  }),

  templateString: Ember.computed('name', function() {
    if (this.get('name') == null) { return; }
    return this._templates[this.get('name')];
  }),

  _templates: {
    overview: `
      {{#ember-grid width=800 height=200 rowHeight=25 data=data showFooter=true }}

        {{#eg-column 
            key="name" width=250 header="Name" footer="Name Footer Here" 
            min-width=150 max-width=300 align="center"}}
          
          {{#eg-body as |field rowIndex column|}}
            {{rowIndex}} <strong>{{field}}</strong>
          {{/eg-body}}

        {{/eg-column}}

        {{eg-column key="age" width=50 resizable=false align="center"}}

        {{#eg-column key="salary" field=dollarSalary width=100 header="Salary" footer=averageSalary align="right"}}
          
          {{#eg-header as |column|}}
            <span style="text-align: right;display: block; color:yellow">{{column.header}}</span>
          {{/eg-header}}

        {{/eg-column}}

        {{eg-column key="email" width=150}}
      {{/ember-grid}}`,

    minimal: `
      {{! without scroll-y=false, takes available space in parent element }}
      {{ember-grid data=data columns="name,age,salary,email"}}`,

    'scroll-columns': `
      {{! if columns are wider than width, horizontal scrolling is enabled by default}}
      {{#ember-grid data=data width=400 height=400 columns="name,age,salary,email" as |columns|}}
        {{#each columns as |column|}}
          {{eg-column key=column.key width=250}}
        {{/each}}
      {{/ember-grid}}`
   }
});

