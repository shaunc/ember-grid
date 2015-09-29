# Ember-Grid

A Declarative Data Grid for ember that is scalable to millions of rows. Each cell can be defined simply and quickly or fully customised.

 [![Build Status](https://travis-ci.org/shaunc/ember-grid.svg?branch=master)](https://travis-ci.org/shaunc/ember-grid)

## Demo

<http://shaunc.github.io/ember-grid/>

## Installation

* `npm install --save ember-grid`

If you have [ember-cli](http://www.ember-cli.com/) installed globally, you can view the sample application by cloning
the repository and running

* `npm install && bower install`
* `ember serve`

# Usage

## Defining Grid Layout
All the below examples use the following model for the data rows

    {
      name: "Steve",
      lastName: "Fuller",
      age: 32,
      email: "stevey.baby@hotmail.com"
      nightlySleep: {
        '2015-01-01': 24,
        ...
      }
    }

### Defining the overall dimensions

Ember grid only displays data that fits into a fixed size window. Cells will only be rendered as (or just before) they scroll into view. This makes `ember-grid` suitable for displaying very large datasets.

The window may be specified with css, or explicitly with the `height` and
`width` attributes. When using css, override the heights of the `.header`
`.body` and `.footer` elements to size the components relative to the whole.

The height of rows is also important, as ember-grid needs to calculate how many rows will fit in a window. Style `.ember-grid .row` to set height of rows using css, or use the `rowHeight` to set it explicitly.

    {{#ember-grid data=myData width=800 height=200 rowHeight=25}} 
      {{eg-column key="name"}}
      {{eg-column key="age"}}
      {{eg-column key="email"}}
    {{/ember-grid}}

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

### Limit column width

Use css `min-width` and `max-width` on the header cells or specify `min-width` or `max-width` (pixels) on the column. If you specify in the column and in css, the most restrictive one is used.

If the specified `width` of a column lies outside the `min-width`-`max-width` range, it will be brought to the nearest allowable value before displaying the grid.

    .ember-grid .header .cell {
      min-width: 200px;
    }

    {{#ember-grid data=myData }} 
      {{eg-column key="name" width=150 header="Name" min-width=150 max-width=300}}
      {{eg-column key="age" width=50 resizable=false header="Age"}}
      {{eg-column key="email" width=250 header="Email Address"}}
    {{/ember-grid}}

In the above example the name column will have a `min-width` of 200px as the css is more restrictive than the column definition.

> **Note:** *When the `width`, `min-width` or `max-width` is specified in the column, this refers to the inner width of the column, not including padding and borders. A `min-width` specified in the css refers to the outer width and includes padding and borders.*

### Specify column alignment

Use `align` (`"left"` | `"center"` | `"right"`) to control column alignment.

> **Note:** *the `align` option only applies to auto-generated cells. If you override a cell block (see below) then you are in full control of the cell layout.*

    {{#ember-grid data=myData }} 
      {{eg-column key="name" width=150 header="Name"}}
      {{eg-column key="age" width=50 resizable=false header="Age" align="right"}}
      {{eg-column key="email" width=250 header="Email Address"}}
    {{/ember-grid}}

### Supply a custom header

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

### Supply a custom footer

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

### Specify body cell content

By default, the cell content in the table body is the field in the each row of data corresponding to the column key. To override this specify the `field` in the column:

    {{#ember-grid data=myData }} 
      {{eg-column key="name" width=150 header="Name" field="email" }}
      {{eg-column key="age" width=50 resizable=false header="Age" align="right"}}
      {{eg-column key="email" width=250 header="Email Address"}}
    {{/ember-grid}}

Providing a string field is of limited utility. This example merely displays the email field twice. However, field can also be passed in as a function from your outer context (controller or enclosing component). For instance, if you have a controller that defines:

    function fullName(row) {
      return row.name + ' ' + row.lastName;
    }

Then the following table would display the full name in the first column:

    {{#ember-grid data=myData }} 
      {{eg-column key="name" width=150 header="Name" field=fullName }}
      {{eg-column key="age" width=50 resizable=false header="Age" align="right"}}
      {{eg-column key="email" width=250 header="Email Address"}}
    {{/ember-grid}}

The `fullName` accessor is called with `(row, rowIndex, column)`, where `row`
is the current data row, `rowIndex` is the index of the row, and `column` is the current column object. The column object has the properties passed in by you as attributes to the `eg-column`.

### Supply a custom body cell

Place an `eg-body` component inside `eg-column` to override the default body cells for the column:

    {{#ember-grid data=myData }} 
      {{#eg-column key="name" width=150 header="Name" field=fullName }}
        {{#eg-body as |field rowIndex column|}}
          <span class="number">{{rowIndex}}</span>
          <strong>{{field}}</strong>
        {{/eg-body}}
      {{/eg-column}}
      {{eg-column key="age" width=50 resizable=false header="Age" align="right"}}
      {{eg-column key="email" width=250 header="Email Address"}}
    {{/ember-grid}}

The `field` yielded by `eg-body` to the content is either the data field corresponding to the current row, or whatever was returned by the custom accessor supplied as `field` to the `eg-column` attribute. For instance, if our
accessor function was

    function fullName(row) {
      return {first: row.name, last: row.lastName};
    }

Then the `eg-body` could be written:

        {{#eg-body as |field|}}
          <span class="first">{{field.first}}</span>
          <span class="last">{{field.last}}</span>
        {{/eg-body}}

Note that as displayed above, the current `rowIndex` and `column` are available in the body of `eg-body`, but of course, needn't be referenced if not required by the calculation.

<a name="control-scrolling"></a>
## Control scrolling & understand dimension defaults

Use `scroll-y` and `scroll-x` to control whether `ember-grid` will enable
scrolling over rows and columns (respectively). Possible settings are `true`,
`false` and `"auto"`. The default behavior is  `scroll-x="auto"`
`scroll-y="auto"`: scroll if the rows or  columns do not fit in the window.
Currently, `true` has the same effect as `auto`. 

Explicitly turning scrolling off, and not specifying a css dimension (width or height) for both `.ember-grid` and `.body` (or specifying `auto`), results
in the body given explicit calculated dimensions to hold the content:

* If neither `.ember-grid` nor `.body` width is specified in css, and
`scroll-x` is false, then the body will be given width as the sum of column
widths. 

* If neither `.ember-grid` nor `.body` height is specified in css, and
`scroll-y` is false, then body will be given height as  
`rowHeight * rowCount`.

Thus, if `width` is `auto`, the grid:

    {{#ember-grid data=myData scroll-x=false}} 
      {{eg-column key="name" width=150 }}
      {{eg-column key="age" width=50 }}
      {{eg-column key="email" width=250 }}
    {{/ember-grid}}

has width 500, and all columns display without scrolling. The grid:

    {{#ember-grid data=myData width=400 }} 
      {{eg-column key="name" width=150 }}
      {{eg-column key="age" width=50 }}
      {{eg-column key="email" width=250 }}
    {{/ember-grid}}

has horizontal scrolling turned on, as the sum of the column widths is 
greater than the total width. The grid:

    {{#ember-grid data=myData width="600" }} 
      {{eg-column key="name"  }}
      {{eg-column key="age" }}
      {{eg-column key="email" }}
    {{/ember-grid}}

renders without scrolling; each column will be assigned a width of 200. If
the surrounding `div` has inner width `600`, leaving 
the width out of the example above would have the same effect:

    <div style="width: 600px">
      {{#ember-grid data=myData }} 
        {{eg-column key="name"  }}
        {{eg-column key="age" }}
        {{eg-column key="email" }}
      {{/ember-grid}}
    </div>

The relationship between `height` and `scroll-y` is analogous, but
keep in mind that the vertical scroll bar scrolls the `.body` element
only, while the horizontal one scrolls the whole content (inside
of border and any padding). By default, the body is styled with flexbox
to grow to fill up any space header and footer don't use.

## Supplying Data

Data is supplied as an array. The type of array required depends on the use case. If `Array.isArray()` is false, and the data has a `toArray` method, it is called to retrieve the final content.

### Immutable Data Array

If the `data` items will never change, supply a plain JavaScript array. Note that modifications to the array will not be reflected in the grid.

### Mutable Data Array

When items will be added to and removed from the data array, the supplied
`data` array must be an Ember Array (`Ember.A([...])`). Items must be added
using `addObject`/`addObjects`/`pushObject`/`pushObjects` and removed with
`removeObject`/`removeObjects`/`popObject`.

### Promises

`data` can be supplied as a promise which resolves to an array. Once the promise has resolved, the data will be rendered into the grid as normal.

## Show content if there are no data rows

Place an `eg-if-empty` component inside the `ember-grid` component to show custom content when there are no rows in the `data`. 

    {{#ember-grid ...}}
        ...
        {{eg-column ...}}
        ...

        {{#eg-if-empty}}
            {{!-- Display this when data array is empty. --}}
            Nothing to see here!
        {{/eg-if-empty}}
    {{/ember-grid}}

## Override Styling

Use the following selectors in your css to affect corresponding parts of the layout.

| Selector | Target |
| --- | --- |
| `.ember-grid` | Outer grid |
| `.ember-grid .header` | Header row |
| `.ember-grid .header .cell` | Header cells |
| `.ember-grid .body` | Body section |
| `.ember-grid .body .row` | Body rows |
| `.ember-grid .body .row .cell` | Body cells |
| `.ember-grid .body .row .cell.odd` | Body cells in odd rows |
| `.ember-grid .body .row.empty .cell` | Cell that displays `eg-if-empty` message |
| `.ember-grid .footer` | Footer row |
| `.ember-grid .footer .cell` | Footer cells |
| `.ember-grid .cell` | All cells |

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Authors

- [Shaun Cutts](https://twitter.com/shauncutts)
- [Bryan Crotaz](https://twitter.com/bryancrotaz)

## Legal

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
