import * as React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import styles from './viewTransactionsStyles';
import { ITransactionHistory, IViewTransactionGridProps, IViewTransactionGridRowProps } from './viewTransactionsInterfaces';
import * as moment from 'moment';

export const ViewTransactionsGrid: React.StatelessComponent<IViewTransactionGridProps> = (props) => {
    const transactionsGrid: JSX.Element = (
        <div>
            <Table selectable={false} bodyStyle={{ overflow: 'visible' }}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn
                            key={'Column_Debtor'}
                            style={styles.owesMeHeader}
                        >
                            OWES ME
                  </TableHeaderColumn>
                        <TableHeaderColumn
                            key={'Column_Gross'}
                            style={styles.valueHeader}
                        >
                            VALUE
                  </TableHeaderColumn>
                        <TableHeaderColumn
                            key={'Column_Date'}
                            style={styles.dateHeader}
                        >
                            date
                  </TableHeaderColumn>
                        <TableHeaderColumn
                            key={'Column_Reference'}
                            style={styles.referenceHeader}
                        >
                            reference
                  </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {props.transactionHistoryArray.map((transaction: ITransactionHistory) =>
                        <ViewTransactionsGridRow {...transaction} />,
                    )}
                </TableBody>
            </Table>
        </div>
    );

    return transactionsGrid;
};

const ViewTransactionsGridRow: React.StatelessComponent<IViewTransactionGridRowProps> = (props) => {
    const formatteddate = moment(props.date).format('Do MMM YYYY');
    return (
        <TableRow key={'Row_' + props.transactionId}>
            <TableRowColumn
                key={'Data_' + props.transactionId + '_Debtor'}
                style={styles.owesMeDetail}
            >
                {props.debtorDisplayName}
            </TableRowColumn>
            <TableRowColumn
                key={'Data_' + props.transactionId + '_Gross'}
                style={styles.valueDetail}
            >
                {props.gross}
            </TableRowColumn>
            <TableRowColumn
                key={'Data_' + props.transactionId + '_Date'}
                style={styles.dateDetail}
            >
                {formatteddate}
            </TableRowColumn>
            <TableRowColumn
                key={'Data_' + props.transactionId + '_Reference'}
                style={styles.referenceDetail}
            >
                {props.reference}
            </TableRowColumn>
        </TableRow>
    );
};
