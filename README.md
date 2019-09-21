
# React Filter Tables
![A simple sortable table with filter option and pagination](http://bit.ly/filter-table)

A simple sortable table with filter option and pagination.

## Features

 - Simple design
 - Funnel icon allows to filter data
 - Multiple filters can be applied at same time
 - Funnel icon color changes on applying filter to indicate presence of filter
 - Clear all filters button present ( clears all applied filters )
 - Click anywhere on the column headder to sort it in alphabetical order
 - Click anywhere on column headder to toggle sort in ascending and descending order
 - Click on a row to get all details of that row ( can be used to integrate with API calls )
 - Number of records shown per page configurable ( Default is 4 records per page )
 - Pagination with left and right arrows to move one page and dropdown to move to specific page
 - User specified inline styles and CSS classes can be applied by passing props

## Usage
**Step 1: Install the module**

Run:

`npm install react-filter-tables --save`

**Step 2: Import the module**

Add following line to import the module:

`import FilterTable from 'react-filter-tables';`

**Step 3: Use the module**

To use the module, you must pass your data to the module.
Data is a JSON array of objects where each object represent a row of the table.

#### Example

```
import React from 'react';
import ReactDOM from 'react-dom';
import FilterTable from 'react-filter-tables'

let data = [
  {
    'Id': 1,
    'type': 'test',
    'name': 'alan',
    'username': 'abcd123'
  },
  {
    'Id': 2,
    'type': 'xyz',
    'name': 'diana',
    'username': 'userd1'
  },
  {
    'Id': 3,
    'type': 'abc',
    'name': 'tessa',
    'username': 'tez45'
  }
]

ReactDOM.render(<FilterTable data={data}/>, document.getElementById('root'));
```

## Using Additional Features
This section shows how to use additional features of Filter Table Component.

```
<FilterTable
  data = { this.state.data }
  onClick = { ( rowObject ) => {
    console.log( rowObject );
  }}
  recordsPerPage = { 8 }
  style = {{ position:'absolute', minWidth: '50%' }},
  classNames = {["your_css_class_1", "your_css_class_2"]} />
```

### Description of Props
|Name|Description  |Sample Value|
|--|--|--|
| *data* |An array of objects. Each object represent a row. If no value is specified, then a 'No data found' message will be displayed. Note that in the sample value, I have given it in an inline format. Always make sure that data is an array of objects. Refer the [example in Step 3](#example). |<code>data = { [<br/>&nbsp;&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;id : 1,<br/>&nbsp;&nbsp;&nbsp;&nbsp;name: 'alan'<br/>&nbsp;&nbsp;},<br/>&nbsp;&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;id: 2,<br/>&nbsp;&nbsp;&nbsp;&nbsp;name: 'diana'<br/>&nbsp;&nbsp;}<br/>]}</code>|
|*onClick*|Accepts a callback function. This function will be called when user clicks on any row. The object curresponding to the clicked row will be passed as arguement to the function. Can be used to make API calls when user clicks on a row.|<code>onClick = { (rowObject) => {<br/>&nbsp;&nbsp;console.log(rowObject);<br/>&nbsp;&nbsp;this.makeApiCall(rowObject.id);<br/>}}</code>|
|*recordsPerPage*|Allows configuring the number of records shown per page. If no value is specified, default records per page is 4.|`recordsPerPage={8}`|
|*style*|Allows the user to define inline styles which would be directly applied to the table. Accepts an object.|<code>style = {{<br/>&nbsp;&nbsp;position:'absolute',<br/>&nbsp;&nbsp;top: '0',<br/>&nbsp;&nbsp;left: '0'<br/>}}</code>|
|*classNames*|Accepts an array containing user defined class names. These classes will be directly applied to the table.|<code>classNames = {[<br/>&nbsp;&nbsp;"my-class-1",<br/>&nbsp;&nbsp;"my-class-2"<br/>]}</code>|

## Change log

- Dependency on libraries :- fontawesome-actions and classnames removed
