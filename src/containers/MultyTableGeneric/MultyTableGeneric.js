import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Button } from "react-bootstrap";
import "./MultyTableGeneric.css";

const { SearchBar, ClearSearchButton } = Search;

export default class MultyTableGeneric extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    actionsFormatter = (cell, row) => {
        console.log(row);
        return (
            < div style={{ textAlign: 'left' }}>

                <button
                    onClick={() => this.props.hadleDelete(row)}
                    className="btn btn-link btn-sm">
                    מחק
                </button>
                <h>|</h>
                <button
                    onClick={() => this.props.hadleEdit(row)}
                    className="btn btn-link btn-sm">
                    ערוך
                </button>
            </div>
        );
    }




    render() {

        const defaultSorted = [{
            dataField: 'name',
            order: 'desc'
        }];

        const editColumn = {
            dataField: 'actions',
            text: '',
            isDummyField: true,
            formatter: this.actionsFormatter,
        };



        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total" > / {size}
            </span>
        );

        const pagingOptions = {
            showTotal: true,
            paginationTotalRenderer: customTotal,
        };



        return (
            <div>
                <div style={{ textAlign: 'right' }}>
                    <ToolkitProvider
                        bootstrap4
                        keyField='id'
                        data={this.props.data}
                        columns={[editColumn, ...this.props.ColumnNames]}
                        striped
                        hover
                        defaultSorted={defaultSorted}
                        search

                    >
                        {
                            props => (
                                <div >

                                    {/* <ClearSearchButton {...props.searchProps}
                                    /> */}
                <SearchBar
                  {...props.searchProps}
                  style={{ textAlign: "right", paddingLeft: "5px" }}
                  placeholder="...חפש"
                />
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  filter={filterFactory()}
                  noDataIndication="אין מידע להציג, הוסף בעזרת כפתור ההוספה"
                  pagination={paginationFactory(pagingOptions)}
                  bordered={false}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    );
  }
}
