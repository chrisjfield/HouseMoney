import * as React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles';
import { IViewTransactionsProps, IViewTransactionsState, IViewTransactionDetails } from './interfaces';
import * as moment from 'moment';
import APIHelper from '../../helpers/apiHelper';

class ViewTransactions extends React.Component<IViewTransactionsProps, IViewTransactionsState> {
    constructor(props: IViewTransactionsProps) {
        super(props);
        this.state = {
            transactionsReturned: false,
            transactionsData: [],
            pageNumber: 1,
            pageSize: 10,
            transactionCount: 0,
        };
    }

    componentWillMount() {
        this.getGridData();
    }

    getGridData = () => {
        const userId = this.props.loggedInUser.userId;
        const request = APIHelper.apiCall(
              'GET',
              'TransactionHistorySummaries/getUserTransactionHistory?userID=' +
                userId +
                '&pageSize=' +
                this.state.pageSize +
                '&pageNumber=' +
                this.state.pageNumber,
            );

        return request.then(json =>
          this.setState({ transactionsData: json, transactionsReturned: true }),
        );
    }

    prevPage = () => {
        this.setState({ pageNumber: this.state.pageNumber - 1 }, () =>
          this.getGridData(),
        );
    }

    nextPage = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 }, () =>
          this.getGridData(),
        );
    }

    createGrid = () => {
        const transactionsGrid = (
          <div>
            <Table selectable={false} bodyStyle={{ overflow: 'visible' }}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn
                    key={'Column_OTHERS'}
                    style={styles.owesMeHeader}
                  >
                    OWES ME
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    key={'Column_GROSS'}
                    style={styles.valueHeader}
                  >
                    VALUE
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    key={'Column_DATE'}
                    style={styles.dateHeader}
                  >
                    DATE
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    key={'Column_REFERENCE'}
                    style={styles.referenceHeader}
                  >
                    REFERENCE
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>{this.createRows()}</TableBody>
            </Table>
            <FlatButton
              key="Previous"
              label="Previous"
              onClick={this.prevPage}
              disabled={this.state.pageNumber <= 1}
            />
            <FlatButton
              key="Next"
              label="Next"
              onClick={this.nextPage}
              disabled={this.state.transactionsData.length !== this.state.pageSize}
            />
          </div>
        );

        return transactionsGrid;
    }

    createRow = (transactionData: IViewTransactionDetails) => {
        const formattedDate = moment(transactionData.DATE).format('Do MMM YYYY');
        return (
          <TableRow key={'Row_' + transactionData.PRIMARYKEY}>
            <TableRowColumn
              key={'Data_' + transactionData.PRIMARYKEY + '_OTHERS'}
              style={styles.owesMeDetail}
            >
              {transactionData.OTHERS}
            </TableRowColumn>
            <TableRowColumn
              key={'Data_' + transactionData.PRIMARYKEY + '_AMOUNT'}
              style={styles.valueDetail}
            >
              {transactionData.AMOUNT}
            </TableRowColumn>
            <TableRowColumn
              key={'Data_' + transactionData.PRIMARYKEY + '_DATE'}
              style={styles.dateDetail}
            >
              {formattedDate}
            </TableRowColumn>
            <TableRowColumn
              key={'Data_' + transactionData.PRIMARYKEY + '_REFERENCE'}
              style={styles.referenceDetail}
            >
              {transactionData.REFERENCE}
            </TableRowColumn>
          </TableRow>
        );
    }

    createRows = () => this.state.transactionsData.map(this.createRow);

    noTransactionsFound = () => {
        const notFound = (
          <div>
            {' '}
            No transactions found. <p /> Hint: you can click the plus button to add
            transactions.{' '}
          </div>
        );
        return notFound;
    }

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
    }

    render() {
        return (
          <div style={styles.container}>
            <h2>My Transactions</h2>
            <div id="viewTransactionsTableContainer" style={styles.container}>
              <div className="row">
                <div className="col-lg-4 col-lg-push-4 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2 col-xs-12">
                  <div id="viewTransactionsGrid" className="grid" />
                  {this.determineRender()}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: any) => {
    return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(ViewTransactions);
