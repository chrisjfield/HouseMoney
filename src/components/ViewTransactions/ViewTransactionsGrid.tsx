import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import * as moment from 'moment';
import * as React from 'react';
import { ITransactionHistory, IViewTransactionGridProps, IViewTransactionGridRowProps } from './viewTransactionsInterfaces';
import styles from './viewTransactionsStyles';

export const ViewTransactionsGrid: React.StatelessComponent<IViewTransactionGridProps> = (props) => {
    // TODO: is this necessary? on table bodyStyle={{ overflow: 'visible' }}
    const transactionsGrid: JSX.Element = (
        <div>
            <Table >
                <TableHead>
                    <TableRow>
                        <Tooltip id="tooltip-top" title="The name of the person who owes you" placement="top">
                            <TableCell
                                key={'Column_Debtor'}
                                style={styles.owesMeHeader}
                            >
                                Owes Me
                        </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The amount you are owed" placement="top">
                            <TableCell
                                key={'Column_Gross'}
                                style={styles.valueHeader}
                            >
                                Value
                        </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The date of the transaction" placement="top">
                            <TableCell
                                key={'Column_Date'}
                                style={styles.dateHeader}
                            >
                                Date
                        </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The transaction description" placement="top">
                            <TableCell
                                key={'Column_Reference'}
                                style={styles.referenceHeader}
                            >
                                Description
                        </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The person who added this transaction" placement="top">
                            <TableCell
                                key={'Column_EnteredBy'}
                                style={styles.owesMeHeader}
                            >
                                Added By
                        </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The date when this transaction was added" placement="top">
                            <TableCell
                                key={'Column_EnteredDate'}
                                style={styles.dateHeader}
                            >
                                Date Added
                        </TableCell>
                        </Tooltip>
                    </TableRow>
                </TableHead>
                <TableBody>
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
    const formattedDate = moment(props.date).format('Do MMM YYYY');
    const formattedEnteredDate = moment(props.enteredDate).format('hh:mm:ss Do MMM YYYY');
    return (
        <TableRow key={'Row_' + props.transactionId}>
            <TableCell
                key={'Data_' + props.transactionId + '_Debtor'}
                style={styles.owesMeDetail}
            >
                {props.debtorDisplayName}
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_Gross'}
                style={styles.valueDetail}
            >
                {props.gross}
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_Date'}
                style={styles.dateDetail}
            >
                {formattedDate}
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_Reference'}
                style={styles.referenceDetail}
            >
                {props.reference}
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_EnteredBy'}
                style={styles.owesMeDetail}
            >
                {props.enteredByDisplayName}
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_EnteredDate'}
                style={styles.dateDetail}
            >
                {formattedEnteredDate}
            </TableCell>
        </TableRow>
    );
};
