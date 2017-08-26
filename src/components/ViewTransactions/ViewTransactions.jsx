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
import moment from "moment";

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
      gridHeader: {
        backgroundColor: muiTheme.palette.backgroundColor,
        color: muiTheme.palette.primary1Color
      },
      gridDetail: {
        backgroundColor: muiTheme.palette.backgroundColor,
        color: muiTheme.palette.textColor
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
      emailAddress = this.props.loggedInUser.EMAILADDRESS,
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
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn
              key={"Column_OTHERS"}
              style={this.styles.gridHeader}
            >
              OTHERS
            </TableHeaderColumn>
            <TableHeaderColumn
              key={"Column_GROSS"}
              style={this.styles.gridHeader}
            >
              GROSS
            </TableHeaderColumn>
            <TableHeaderColumn
              key={"Column_DATE"}
              style={this.styles.gridHeader}
            >
              DATE
            </TableHeaderColumn>
            <TableHeaderColumn
              key={"Column_REFERENCE"}
              style={this.styles.gridHeader}
            >
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
    const formattedDate = moment(transactionData.DATE).format("Do MMM YYYY");
    return (
      <TableRow key={"Row_" + transactionData.PRIMARYKEY}>
        <TableRowColumn
          key={"Data_" + transactionData.PRIMARYKEY + "_OTHERS"}
          style={this.styles.gridDetail}
        >
          {transactionData.OTHERS}
        </TableRowColumn>
        <TableRowColumn
          key={"Data_" + transactionData.PRIMARYKEY + "_AMOUNT"}
          style={this.styles.gridDetail}
        >
          {transactionData.AMOUNT}
        </TableRowColumn>
        <TableRowColumn
          key={"Data_" + transactionData.PRIMARYKEY + "_DATE"}
          style={this.styles.gridDetail}
        >
          {formattedDate}
        </TableRowColumn>
        <TableRowColumn
          key={"Data_" + transactionData.PRIMARYKEY + "_REFERENCE"}
          style={this.styles.gridDetail}
        >
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
        <h2>My Transactions</h2>
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
  return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(ViewTransactions);
