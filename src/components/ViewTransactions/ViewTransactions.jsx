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
import dateHelper from "../../helpers/dateHelper";

class ViewTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsReturned: false,
      transactionsData: {}
    };
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      },
      grid: {
        color: "black"
      }
    };
    this.createGrid = this.createGrid.bind(this);
    this.getGridData = this.getGridData.bind(this);
  }

  componentWillMount = () => {
    this.getGridData();
  };

  getGridData() {
    const pageNumber = 1,
      pageSize = 10,
      emailAddress = this.props.loggedInUser,
      request = apiCall(
        "GET",
        "TransactionHistorySummaries/getUserTransactionHistory?emailAddress=" +
          emailAddress +
          "&pageSize=" +
          pageSize +
          "&pageNumber=" +
          pageNumber
      );

    return request.then(json =>
      this.setState({ transactionsData: json, transactionsReturned: true })
    );
  }

  createGrid() {
    const transactionsGrid = (
      <Table styles={this.styles.grid} selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn key={"Column_OTHERS"}>OTHERS</TableHeaderColumn>
            <TableHeaderColumn key={"Column_GROSS"}>GROSS</TableHeaderColumn>
            <TableHeaderColumn key={"Column_DATE"}>DATE</TableHeaderColumn>
            <TableHeaderColumn key={"Column_REFERENCE"}>
              REFERENCE
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.createRows()}
        </TableBody>
      </Table>
    );

    return transactionsGrid;
  }

  createRow = transactionData => {
    const formattedDate = dateHelper.getLocaleDateTimeString(
      transactionData.DATE
    );
    return (
      <TableRow key={"Row_" + transactionData.PRIMARYKEY}>
        <TableRowColumn key={"Data_" + transactionData.OTHERS}>
          {transactionData.OTHERS}
        </TableRowColumn>
        <TableRowColumn key={"Data_" + transactionData.AMOUNT}>
          {transactionData.AMOUNT}
        </TableRowColumn>
        <TableRowColumn key={"Data_" + transactionData.DATE}>
          {formattedDate}
        </TableRowColumn>
        <TableRowColumn key={"Data_" + transactionData.REFERENCE}>
          {transactionData.REFERENCE}
        </TableRowColumn>
      </TableRow>
    );
  };

  createRows = () => this.state.transactionsData.map(this.createRow);

  noTransactionsFound() {
    const notFound = <div> No transactions found </div>;
    return notFound;
  }

  render() {
    return (
      <form name="ViewTransactionsForm" style={this.styles.container}>
        <h1>My Transactions</h1>
        <div id="ViewTransactionsTable" style={this.styles.container}>
          {this.state.transactionsReturned && this.state.transactionsData
            ? this.createGrid()
            : this.noTransactionsFound()}
        </div>
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return { loggedInUser: store.navReducer.USER.EMAILADDRESS };
};

export default connect(mapStateToProps)(ViewTransactions);
