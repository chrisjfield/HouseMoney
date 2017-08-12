import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
//import getUserInformation from "../helpers/simpleAPICall";
//import ApiUtilities from "../helpers/apiUtilities";

class Stacks extends Component {
  // constructor(props) {
  //   super(props);
  //   //this.userInfo = {}; // can do shit here Ed
  //   this.setState((_columns: [{}]));
  //   this.props._rows = [];
  // }

  createGrid = () => {
    this._columns = [
      { key: "id", name: "ID" },
      { key: "title", name: "Title" },
      { key: "count", name: "Count" }
    ];
    this.createRows();
  };

  //helper not behaving here Ed! ApiUtilities or getUserInformation. but basic fetch works
  // getUserInformation = () => {
  //   const apiBaseURL = "http://localhost:58399";
  //   const request = new Request(`${apiBaseURL}/api/Users/GetUserInformation`, {
  //     method: "GET"
  //   });
  //   return fetch(request)
  //     .then(response => response.json())
  //     .then(data => {
  //       this._columns = [data];
  //       this.createRows();
  //     })
  //     .catch(e => e);
  // };

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 6; i++) {
      rows.push({
        id: "Ed",
        title: i,
        count: i * 1000
      });
    }

    this._rows = rows;
    // this.buildGrid();
  };

  rowGetter = i => {
    return this._rows[i];
  };

  // buildGrid = () => {
  //   return (
  //     <ReactDataGrid
  //       columns={this._columns}
  //       rowGetter={this.rowGetter}
  //       rowsCount={this._rows.length}
  //       minHeight={100}
  //     />
  //   );
  // };

  render() {
    return (
      <div className="col-sm-4 col-sm-offset-4 form-main">
        <h2>House Money Summary</h2>
        <div id="moneyStacksTableContainer">
          <div id="moneyStacksGrid" className="grid" />
          {this.createGrid()}
          <ReactDataGrid
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this._rows.length}
            minHeight={250}
          />
        </div>
      </div>
    );
  }
}

export default Stacks;
