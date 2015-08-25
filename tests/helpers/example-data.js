import generateData from 'dummy/utils/generate-data';

var personTable500 = generateData(500, {
    name: 'name', 
    age: {name: 'age', options: {type: 'adult'}},
    salary: {name: 'floating', options: {min: 0, max: 200000, fixed: 2}},
    email: {name: 'email', options: {domain: 'example.com'}}
    }, 4359);
var personTable10 = personTable500.slice(0, 10);

export { personTable10, personTable500 };