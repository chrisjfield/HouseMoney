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
import styles from './styles';
import appStyles from '../../styles';
import { IHouseSummaryProps, IHouseSummaryState } from './interfaces';
import { ITransactionSummaryObject } from '../../interfaces/transactionInterfaces';
import * as math from 'mathjs';
import APIHelper from '../../helpers/apiHelper';
import { IOccupant } from '../Occupants/occupantsInterfaces';
import { IStore } from '../../interfaces/storeInterface';

class HouseSummary extends React.Component<IHouseSummaryProps, IHouseSummaryState> {
    _rows: Function;
    constructor(props: IHouseSummaryProps) {
        super(props);
        this.state = {
            occupantDataReturned: false,
            occupantData: [],
            gridDataReturned: false,
            gridData: [],
        };
    }

    componentWillMount() {
        this.getUserData();
        this.getGridData();
    }

    getUserData = () => {
        const request = APIHelper.apiCall('GET', 'Users/GetUserInformation', this.props.loggedInOccupant.token);

        return request.then((json: IOccupant[]) =>
          this.setState({ occupantData: json, occupantDataReturned: true }),
        );
    }

    getGridData = () => {
        const request = APIHelper.apiCall('GET', 'TransactionSummaries', this.props.loggedInOccupant.token);

        return request.then((json: ITransactionSummaryObject[]) =>
          this.setState({ gridData: json, gridDataReturned: true }),
        );
    }

    createColumn = (occupantData: IOccupant) => {
        const column = (
            <TableHeaderColumn
              key={'Column' + occupantData.email}
              style={styles.gridHeader}
            >
              {occupantData.email ? occupantData.email + ' owes' : null}
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

    createRow = (occupantData: IOccupant) => {
        const rowsData = this.state.gridData.filter(
          (gridElement: ITransactionSummaryObject) => gridElement.USER === occupantData.email,
        );
        const tableRowData = rowsData.map(this.createRowData);
        return (
          <TableRow key={'Row' + occupantData.email}>
            <TableRowColumn key={'RowColumn' + occupantData.email} style={styles.gridHeader}>
              {occupantData.email}
            </TableRowColumn>
            {tableRowData}
          </TableRow>
        );
    }

    createColumns = () => {
        const columnData = ['', ...this.state.occupantData];
        return columnData.map(this.createColumn);
    }

    createRows = () => this.state.occupantData.map(this.createRow);

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
                  {this.state.gridDataReturned && this.state.occupantDataReturned ? (
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
const mapStateToProps = (store: IStore) => {
    return { loggedInOccupant: store.occupantsReducer.loggedInOccupant };
};

export default connect(mapStateToProps)(HouseSummary);
