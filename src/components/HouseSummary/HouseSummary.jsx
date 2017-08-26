import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import apiCall from "../../helpers/apiHelper";
import { muiTheme } from "../../main/themes";

class HouseSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataReturned: false,
      userData: {},
      gridDataReturned: false,
      gridData: {}
    };

    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      },
      gridHeader: {
        backgroundColor: muiTheme.palette.backgroundColor,
        color: muiTheme.palette.primary1Color
      },
      gridDetail: {
        backgroundColor: muiTheme.palette.backgroundColor,
        color: muiTheme.palette.textColor
      }
    };
  }

  componentWillMount = () => {
    this.getUserData();
    this.getGridData();
  };

  getUserData = () => {
    const request = apiCall("GET", "Users/GetUserInformation");

    return request.then(json =>
      this.setState({ userData: json, userDataReturned: true })
    );
  };

  getGridData = () => {
    const request = apiCall("GET", "TransactionSummaries");

    return request.then(json =>
      this.setState({ gridData: json, gridDataReturned: true })
    );
  };

  createColumn = userData => {
    const column = (
      <TableHeaderColumn
        key={"Column" + userData.EMAILADDRESS}
        style={this.styles.gridHeader}
      >
        {userData.EMAILADDRESS}
      </TableHeaderColumn>
    );

    return column;
  };

  createRowData = tableRowData => {
    const row = (
      <TableRowColumn
        key={"Data" + tableRowData.USER}
        style={this.styles.gridDetail}
      >
        {tableRowData.TOTAL}
      </TableRowColumn>
    );
    return row;
  };

  createRow = userData => {
    const rowsData = this.state.gridData.filter(
      gridElement => gridElement.USER === userData.EMAILADDRESS
    );
    const tableRowData = rowsData.map(this.createRowData);
    return (
      <TableRow key={"Row" + userData.EMAILADDRESS}>
        <TableRowColumn key={tableRowData.USER} style={this.styles.gridHeader}>
          {userData.EMAILADDRESS + " owes"}
        </TableRowColumn>
        {tableRowData}
      </TableRow>
    );
  };

  createColumns = () => {
    const columnData = ["", ...this.state.userData];
    return columnData.map(this.createColumn);
  };

  createRows = () => this.state.userData.map(this.createRow);

  createGrid = () => {
    const dataGrid = (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {this.createColumns()}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.createRows()}
        </TableBody>
      </Table>
    );

    return dataGrid;
  };

  rowGetter = i => {
    return this._rows[i];
  };

  render() {
    return (
      <div style={this.styles.container}>
        <h2>House Money Summary</h2>
        <div id="moneyHouseSummaryTableContainer">
          <div id="moneyHouseSummaryGrid" className="grid" />
          {this.state.gridDataReturned & this.state.userDataReturned
            ? this.createGrid()
            : undefined}
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return {};
};

export default connect(mapStateToProps)(HouseSummary);
