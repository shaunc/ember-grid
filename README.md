# Ember-infinite-table

This README outlines the details of collaborating on this Ember addon.

[![Build Status](https://travis-ci.org/BryanCrotaz/ember-grid.svg?branch=master)](https://travis-ci.org/BryanCrotaz/ember-grid)

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Usage

```
{{#ember-grid items=myData columns=myColumns as |row|}}

  {{#eg-column key="name" myData=Bryan}}
    {{#header-cell key="name"}}
      <h1>Name</h1>
    {{/header-cell}}
  {{/eg-column}}

  {{#eg-scrollable-columns}}
	  
	  {{#eg-column key="name"}}
	  
	    {{#eg-header}}
	      <h1>Name</h1>
	    {{/eg-header}}
	  
      {{#eg-body}}
        {{my-component value="name"}}
      {{/eg-body}}

      {{#eg-footer value=averagePrice}}  // gets called with column as param
        {{my-component value=value}}
      {{/eg-footer}}

	  {{/eg-column}}

	{{/eg-scrollable-columns}}

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
