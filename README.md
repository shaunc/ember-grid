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
	  
	    {{#header-cell}}
	      <h1>Name</h1>
	    {{/header-cell}}
	  
      {{#row-cell}}
        {{edit value="name"}}
      {{/row-cell}}

      {{#footer-cell value=averagePrice}}  // gets called with column as param
        {{edit value=value}}
      {{/footer-cell}}

	  {{/eg-column}}

	{{/eg-scrollable-columns}}

{{/ember-grid}}
```



{{#et-headers as |cell|}}
  {{header-cell}}
{{/et-headers}}

{{#ember-collection}}
  
	

{{/ember-collection}}

{{#et-footer-rows as |rows|}}
  {{#et-footer-row-cells as |cell|}}
    {{footer-row-cell}}
  {{/et-footer-row-cells}}
{{/et-footer-rows}}




## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
