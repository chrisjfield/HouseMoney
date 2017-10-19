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
import * as math from 'mathjs';
import APIHelper from '../../helpers/apiHelper';
import { IHouseSummaryProps, IHouseSummaryState } from './interfaces';
import { IUserObject } from '../../interfaces/userInterfaces';
import { ITransactionSummaryObject } from '../../interfaces/transactionInterfaces';
import styles from './styles';
import appStyles from '../../styles';

class HouseSummary extends React.Component<IHouseSummaryProps, IHouseSummaryState> {
    _rows: Function;
    constructor(props: IHouseSummaryProps) {
        super(props);
        this.state = {
            userDataReturned: false,
            userData: [],
            gridDataReturned: false,
            gridData: [],
        };
    }

    componentWillMount() {
        this.getUserData();
        this.getGridData();
    }

    getUserData = () => {
        const request = APIHelper.apiCall('GET', 'Users/GetUserInformation');

        return request.then((json: IUserObject[]) =>
          this.setState({ userData: json, userDataReturned: true }),
        );
    }

    getGridData = () => {
        const request = APIHelper.apiCall('GET', 'TransactionSummaries');

        return request.then((json: ITransactionSummaryObject[]) =>
          this.setState({ gridData: json, gridDataReturned: true }),
        );
    }

    createColumn = (userData: IUserObject) => {
        const column = (
            <TableHeaderColumn
              key={'Column' + userData.email}
              style={styles.gridHeader}
            >
              {userData.email ? userData.email + ' owes' : null}
            </TableHeaderColumn>
        );

        return column;
    }

    createRowData = (tableRowData: ITransactionSummaryObject) => {
        const row = (
          <TableRowColumn
            key={'Data' + tableRowData.USER}
            style={styles.gridDetail}
          >
            {Number(math.round(tableRowData.TOTAL, 2)).toFixed(2)}
          </TableRowColumn>
        );
        return row;
    }

    createRow = (userData: IUserObject) => {
        const rowsData = this.state.gridData.filter(
          (gridElement: ITransactionSummaryObject) => gridElement.USER === userData.email,
        );
        const tableRowData = rowsData.map(this.createRowData);
        return (
          <TableRow key={'Row' + userData.email}>
            <TableRowColumn key={tableRowData.USER} style={styles.gridHeader}>
              {userData.email}
            </TableRowColumn>
            {tableRowData}
          </TableRow>
        );
    }

    createColumns = () => {
        const columnData = ['', ...this.state.userData];
        return columnData.map(this.createColumn);
    }

    createRows = () => this.state.userData.map(this.createRow);

    createGrid = () => {
        const dataGrid = (
          <Table
            selectable={false}
            style={styles.grid}
            bodyStyle={{ overflow: 'visible' }}
          >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>{this.createColumns()}</TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>{this.createRows()}</TableBody>
          </Table>
        );

        return dataGrid;
    }

    rowGetter = (i: number) => {
        return this._rows[i];
    }

    render() {
        return (
          <div style={appStyles.container}>
            <h2>House Money Summary</h2>
            <div id="houseSummaryTableContainer" style={styles.gridContainer}>
              <div className="row">
                <div className="col-lg-4 col-lg-push-4 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2 col-xs-12">
                  <div id="houseSummaryGrid" className="grid" />
                  {this.state.gridDataReturned && this.state.userDataReturned ? (
                    this.createGrid()
                  ) : (
                    <CircularProgress />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: any) => {
    return {};
};

export default connect(mapStateToProps)(HouseSummary);
