# Ember-Grid

A Declarative data grid for ember.

[![Build Status](https://travis-ci.org/shaunc/ember-grid.svg?branch=master)](https://travis-ci.org/shaunc/ember-grid)

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Usage

```

{{#ember-grid data=myData columns=myColumns as |row|}} 
                                              // columns may be declared in their entirety
                                              // or passed in and annotated.

  {{#eg-column key="name" cellData=getData}}  // callback called with data row and column
    {{#eg-header}}
      <h1>Name</h1>
    {{/eg-header}}

  {{/eg-column}}                   // this column will render with default body cell, defined below

  {{#eg-columns-list as |column|}} // declare annotations for a series of columns
  
	  {{#eg-column key=column.key cellData=column.dataKey}}
	  
	    {{#eg-header}}
	      <h1>column.name</h1>
	    {{/eg-header}}
	  
      {{#eg-body as |field|}}     // field has already been extracted by the column accessor accessor
        {{my-component value=field.value}}
      {{/eg-body}}

      {{#eg-footer value=averagePrice}}  // gets called with column as param
        {{my-component value=value}}
      {{/eg-footer}}

	  {{/eg-column}}

  {{/eg-columns-list}}

  {{! cell definition out side of columns is default }}
  {{#eg-body as |field column|}}
    <pre>field</pre>
  {{/eg-body}}

{{/ember-grid}}
```


This is then rendered as
```
{{#eg-headers as |cell|}}
  {{eg-header-cell}}
{{/eg-headers}}

{{#ember-collection}}
  
	

{{/ember-collection}}

{{#eg-footer-rows as |rows|}}
  {{#eg-footer-row-cells as |cell|}}
    {{eg-footer-row-cell}}
  {{/eg-footer-row-cells}}
{{/eg-footer-rows}}
```



## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
