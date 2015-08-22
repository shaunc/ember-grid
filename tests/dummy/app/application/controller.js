// Dummy Application Controller.

import Ember from 'ember';
import generateData from 'dummy/utils/generate-data';

export default Ember.Controller.extend({

  gridRows: generateData(500, {
    name: 'name', 
    age: {name: 'age', options: {type: 'adult'}},
    salary: {name: 'floating', options: {min:0, max: 200000, fixed:2}},
    email: {name: 'email', options: {domain: 'example.com'}}
    }, 4359),

  dollarSalary: function(row) {
  	return '$'+row.salary.toFixed(2);
  },

  averageSalary: Ember.computed('gridRows.@each.salary', function() {
  	var salaries = this.get('gridRows').map(function(row) {return row.salary;});
  	if (salaries)
  	{
	  	var sum = salaries.reduce(function(a, b){return a+b;});
	  	return 'AVG $' + (sum / salaries.length).toFixed(2);
	  }
	  else
	  {
	  	return null;
	  }
  })

});