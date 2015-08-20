// Dummy Application Controller.

import Ember from 'ember';
import generateData from 'dummy/utils/generate-data';

export default Ember.Controller.extend({

  gridRows: generateData(200, {
    name: 'name', 
    age: {name: 'age', options: {type: 'adult'}},
    salary: {name: 'dollar', options: {max: 200000}},
    email: {name: 'email', options: {domain: 'example.com'}}
    }, 4359)

});