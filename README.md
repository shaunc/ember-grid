# Ember-Grid

A Declarative Data Grid for ember that is scalable to millions of rows. Each cell can be defined simply and quickly or fully customised.

[![Build Status](https://travis-ci.org/shaunc/ember-grid.svg?branch=master)](https://travis-ci.org/shaunc/ember-grid)

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Usage


    {{#ember-grid data=myData columns=myColumns as |row|}} 
                                                  // columns may be declared in their entirety
                                                  // or passed in and annotated.

      {{#eg-column key="name" footer="My Column Footer" cellData=getData}}  // callback called with data row and column
        {{#eg-header}}
          <h1>Name</h1>
        {{/eg-header}}

        // eg-footer is not specified, so the default footer will use column.footer (My Column Footer)

      {{/eg-column}}                   // this column will render with default body cell, defined below

      {{#eg-columns-list as |column|}} // declare annotations for a series of columns
      
    	  {{#eg-column key=column.key header="My Column Header" cellData=column.dataKey}}
    	   
          // eg-header is not specified, so the default header will use column.header (My Column Header)

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

## Defining columns
All the below examples use the following model for the data rows

    {
      name: "Steve",
      age: 32,
      email: "stevey.baby@hotmail.com"
    }

### Simple text columns

`key` is used to lookup data on the row model and to identify the row for glimmer reuse.

    {{#ember-grid data=myData showHeader=false}} 
      {{eg-column key="name"}}
      {{eg-column key="age"}}
      {{eg-column key="email"}}
    {{/ember-grid}}

### Add a header

`showHeader` (default is `true`). If no header is specified on the column then `key` is used instead.

    {{#ember-grid data=myData }} 
      {{eg-column key="name" header="Name"}}
      {{eg-column key="age" header="Age"}}
      {{eg-column key="email" header="Email Address"}}
    {{/ember-grid}}

### Add a footer

`showFooter` (default is `false`). If no footer is defined on the column then the footer cell is blank. We suggest a function on the containing component to calculate the aggregated footer data.

    averageAge: Ember.computed('myData.@each.age', function() { ... })

    {{#ember-grid data=myData showFooter=true}} 
      {{eg-column key="name" header="Name"}}
      {{eg-column key="age" header="Age" footer=averageAge}}
      {{eg-column key="email" header="Email Address"}}
    {{/ember-grid}}

### Specify column width

Use `width` (pixels) and `resizable` (boolean) to control column width.

    {{#ember-grid data=myData }} 
      {{eg-column key="name" width=150 header="Name"}}
      {{eg-column key="age" width=50 resizable=false header="Age"}}
      {{eg-column key="email" width=250 header="Email Address"}}
    {{/ember-grid}}

### Specify column alignment

Use `align` (`"left"` | `"center"` | `"right"`) to control column alignment.

> **Note:** *the `align` option only applies to auto-generated cells. If you override a cell block (see below) then you are in full control of the cell layout.*

    {{#ember-grid data=myData }} 
      {{eg-column key="name" width=150 header="Name"}}
      {{eg-column key="age" width=50 resizable=false header="Age" align="right"}}
      {{eg-column key="email" width=250 header="Email Address"}}
    {{/ember-grid}}

### Supply custom header

Place an `eg-header` component inside an `eg-column` to override the default header. 

    {{#ember-grid data=myData }} 

      {{#eg-column key="name" width=150 header="Name"}}
        {{#eg-header as |column|}}
          <div>
            <img src="icon.png"/>
            <span>{{column.header}}</span>
          </div>
        {{/eg-header}}
      {{/eg-column}}
    
      {{eg-column key="age" width=50 resizable=false header="Age" align="right"}}
      {{eg-column key="email" width=250 header="Email Address"}}
    {{/ember-grid}}

### Supply custom footer

Place an `eg-footer` component inside an `eg-column` to override the default footer.
Ordering of `eg-header` and `eg-footer` does not affect the output. They are completely independent.

    averageAge: Ember.computed('myData.@each.age', function() { ... })

    {{#ember-grid data=myData }} 

      {{#eg-column key="name" width=150 header="Name" footer=averageAge}}
        {{#eg-header as |column|}}
          <div>
            <img src="icon.png"/>
            <span>{{column.header}}</span>
          </div>
        {{/eg-header}}
        {{#eg-footer as |column|}}
          <div>
            <span>Average: {{column.footer}}</span>
          </div>
        {{/eg-footer}}
      {{/eg-column}}
    
      {{eg-column key="age" width=50 resizable=false header="Age" align="right"}}
      {{eg-column key="email" width=250 header="Email Address"}}
    {{/ember-grid}}

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
