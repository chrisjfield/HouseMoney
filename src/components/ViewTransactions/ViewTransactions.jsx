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
import CircularProgress from "material-ui/CircularProgress";
import FlatButton from "material-ui/FlatButton";
import { muiTheme } from "../../main/themes";
import moment from "moment";
import apiCall from "../../helpers/apiHelper";

class ViewTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsReturned: false,
      transactionsData: {},
      pageNumber: 1,
      pageSize: 10,
      transactionCount: 0
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
    this.getGridData();
  };

  getGridData = () => {
    const emailAddress = this.props.loggedInUser.EMAILADDRESS,
      request = apiCall(
        "GET",
        "TransactionHistorySummaries/getUserTransactionHistory?emailAddress=" +
          emailAddress +
          "&pageSize=" +
          this.state.pageSize +
          "&pageNumber=" +
          this.state.pageNumber
      );

    return request.then(json =>
      this.setState({ transactionsData: json, transactionsReturned: true })
    );
  };

  prevPage = () => {
    this.setState(
      { pageNumber: this.state.pageNumber - 1 },
      () => this.getGridData()
    );
  };

  nextPage = () => {
    this.setState(
      { pageNumber: this.state.pageNumber + 1 },
      () => this.getGridData()
    );
  };

  createGrid = () => {
    const transactionsGrid = (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn
                key={"Column_OTHERS"}
                style={this.styles.gridHeader}
              >
                OWES ME
              </TableHeaderColumn>
              <TableHeaderColumn
                key={"Column_GROSS"}
                style={this.styles.gridHeader}
              >
                VALUE
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
        <FlatButton key="Previous" label="Previous" onClick={this.prevPage} disabled={this.state.pageNumber <= 1} />
        <FlatButton key="Next" label="Next" onClick={this.nextPage} disabled={this.state.transactionsData.length !== this.state.pageSize} />
      </div>
    );

    return transactionsGrid;
  };

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

  noTransactionsFound = () => {
    const notFound = (
      <div>
        {" "}No transactions found. <p /> Hint: you can click the plus button to
        add transactions.{" "}
      </div>
    );
    return notFound;
  };

  determineRender = () => {
    let result;
    if (!this.state.transactionsReturned) {
      result = <CircularProgress />;
    } else if (this.state.transactionsData.length > 0) {
      result = this.createGrid();
    } else {
      result = this.noTransactionsFound();
    }
    return result;
  };

  render() {
    return (
      <form name="ViewTransactionsForm" style={this.styles.container}>
        <h2>My Transactions</h2>
        <div id="ViewTransactionsTable" style={this.styles.container}>
          {this.determineRender()}
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
