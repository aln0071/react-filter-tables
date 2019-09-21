import React from 'react';
import './FilterTable.css';
import Filter from './icons/Filter.js';
import FilterRemove from './icons/FilterRemove.js';

/**
 * @author Alan Kuriakose
 *
 * This renders a simple sortable table with filter option
 */

class FilterTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showDropdown: false,
            filter: [],
            data: props.data,
            pages: Math.ceil(props.data.length/props.recordsPerPage),
            page: 1,
            columns: FilterTable.findColumnNames(props.data)
        }
    }

    static findColumnNames(data) {
      return [...new Set(data.reduce((total, row)=>total.concat(Object.keys(row)), []))]
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.data !== prevState.data) {
            return ({
              data: nextProps.data,
              filter: [],
              columns: FilterTable.findColumnNames(nextProps.data)
            })
        }
        return null;
    }

    changePage(offset) {
        this.setState({
            page: this.state.page+offset
        })
    }

    renderBody() {
        let body =
        this.state.data.filter(object => this.state.filter.length==0 || this.state.filter.filter(ob=>object[ob.column]===ob.value).length === [...new Set(this.state.filter.map(ob=>ob.column))].length )
        .map((object, index)=>
                <tr style={{cursor: 'pointer'}} key={-index} onClick={()=>this.props.onClick(object)}>{
                    this.state.columns.map((key, ind)=><td key={key+ind}>{object[key]}</td>)
                }</tr>
            )
        let pages = Math.ceil(body.length/this.props.recordsPerPage);
        if(this.state.pages !== pages)
            this.setState({
                pages,
                page: 1
            })
        return body.slice((this.state.page-1)*this.props.recordsPerPage, this.state.page*this.props.recordsPerPage);
    }

    render() {
        if(this.props.data.toString()==="")
            return ("No data found")
        return(
            <table className={"filterTable ".concat(this.props.classNames.join(' '))} style={this.props.style}>
							<tbody>
                <tr className="headder">
                    {this.state.columns.map((column, index) => <th id='sort' key={index+column} onClick={(event) => {
                        if(event.target.id==='sort')
                        this.setState({
                            data: this.state.data.sort((a, b)=>{let val = String(a[column]).localeCompare(String(b[column])); return this.state.arrow===column?-val:val; }),
                            arrow: this.state.arrow===column?column+'i':column
                        })
                    }}><span style={{cursor: 'pointer'}} id='sort'>{column}</span>&nbsp;&nbsp;
                  <Filter width={15} style={{ marginRight: '5px', cursor: 'pointer'}} fill={this.state.filter.find(ob=>ob.column===column)?'red':'black'} onClick={() => {
                      this.columnValues = new Set();
                      let lastColumn = this.state.filter.length!==0 && this.state.filter.slice(-1)[0].column;
                      let tempFilter = column===lastColumn?this.state.filter.filter(ob=>ob.column!==lastColumn):this.state.filter
                      this.state.data.filter(object => tempFilter.length==0 || this.state.filter.find(ob=>ob.column===column&&ob.value===object[column]) || tempFilter.filter(ob=>object[ob.column]===ob.value).length === [...new Set(tempFilter.map(ob=>ob.column))].length ).forEach(object => this.columnValues.add(object[column]))
                      this.setState({
                          ['showDropdown' + index]: true
                      })
                  }}/>
                  <span id='sort' style={{fontSize: '20px', cursor: 'pointer', rotate: '180'}}>{this.state.arrow===column?'\u25B2':this.state.arrow===column+'i'?'\u25BC':null}</span>
                        {this.state['showDropdown' + index] &&
                            <div className="dropDown"><div><ul>{
                                Array.from(this.columnValues).sort().map(val =>
                                    <li><input type='checkbox' checked={this.state.filter.find(ob => ob.column === column && ob.value === val)} onClick={(event) => {
                                        let { filter } = this.state;
                                        if (event.target.checked) {
                                            let obj = {
                                                column: column,
                                                value: val
                                            }
                                            this.state.filter.find(object=>object.column===column)?filter.unshift(obj):filter.push(obj)
                                        } else {
                                            filter = filter.filter(ob=>ob.column!==column||ob.value!==val)
                                        }
                                        this.setState({ filter })
                                    }} />
                                        {val}</li>
                                )
                            }</ul></div>
                                <div onClick={() => {
                                    this.setState({
                                        ['showDropdown' + index]: false
                                    })
                                }} style={{ position: 'fixed', top: '0', left: '0', zIndex: '990', width: '100%', height: '100%', opacity: 0 }}></div>
                            </div>
                        }
                    </th>)
                    }
                </tr>
                {
                    this.renderBody()
                }
                <tr><th colSpan='100%' style={{fontStyle: 'normal'}}>{this.state.pages===0?"No data found":<div style={{display: 'inline-block'}}>
                    <span onClick={()=>this.changePage(-1)} className={this.state.page===1?"disabled":"enabled"}>&#9664;</span> Page <select value={this.state.page} onChange={(event) => {
                    this.setState({page: parseInt(event.target.value)})
                }}>{
                    Array.apply(null, {length: this.state.pages}).map((val, ind)=><option key={ind} value={ind+1}>{ind+1}</option>)
                }
                    </select> of {this.state.pages} <span onClick={()=>this.changePage(1)} className={this.state.page===this.state.pages?"disabled":"enabled"}>&#9654;</span></div>}
                    <FilterRemove width={20} fill={this.state.filter.toString()===""?'darkgray':'red'} style={{float: 'right', display: 'inline-block', cursor: 'pointer'}} onClick={()=>{
                        this.setState({
                            filter: []
                        })
                    }} />
                    </th></tr>
							</tbody>
            </table>
        )
    }
}

FilterTable.defaultProps = {
    onClick: ()=>{},
    recordsPerPage: 4,
    data: [],
		style: {},
		classNames: []
}

export default FilterTable;
