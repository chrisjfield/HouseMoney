import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import * as moment from 'moment';
import * as React from 'react';
import { ITransactionHistory, IViewTransactionGridProps, IViewTransactionGridRowProps } from './viewTransactionsInterfaces';
import styles from './viewTransactionsStyles';

export const ViewTransactionsGrid: React.StatelessComponent<IViewTransactionGridProps> = (props) => {
    const transactionsGrid: JSX.Element = (
        <div style={{ overflow: 'auto', maxWidth: '100%' }}>
            <Table >
                <TableHead>
                    <TableRow>
                        <Tooltip id="tooltip-top" title="The name of the person who owes you" placement="top">
                            <TableCell
                                key={'Column_Debtor'}
                                style={styles.owesMeHeader}
                            >
                                <Typography variant="subheading">Owes Me</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The amount you are owed" placement="top">
                            <TableCell
                                key={'Column_Gross'}
                                style={styles.valueHeader}
                            >
                                <Typography variant="subheading">Value</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The date of the transaction" placement="top">
                            <TableCell
                                key={'Column_Date'}
                                style={styles.dateHeader}
                            >
                                <Typography variant="subheading">Date</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The transaction description" placement="top">
                            <TableCell
                                key={'Column_Reference'}
                                style={styles.referenceHeader}
                            >
                                <Typography variant="subheading">Description</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The person who added this transaction" placement="top">
                            <TableCell
                                key={'Column_EnteredBy'}
                                style={styles.owesMeHeader}
                            >
                                <Typography variant="subheading">Added By</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The date when this transaction was added" placement="top">
                            <TableCell
                                key={'Column_EnteredDate'}
                                style={styles.dateHeader}
                            >
                                <Typography variant="subheading">Date Added</Typography>
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
                <Typography color="textSecondary">{props.debtorDisplayName}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_Gross'}
                style={styles.valueDetail}
            >
                <Typography color="textSecondary">{props.gross}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_Date'}
                style={styles.dateDetail}
            >
                <Typography color="textSecondary">{formattedDate}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_Reference'}
                style={styles.referenceDetail}
            >
                <Typography color="textSecondary">{props.reference}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_EnteredBy'}
                style={styles.owesMeDetail}
            >
                <Typography color="textSecondary">{props.enteredByDisplayName}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_EnteredDate'}
                style={styles.dateDetail}
            >
                <Typography color="textSecondary">{formattedEnteredDate}</Typography>
            </TableCell>
        </TableRow>
    );
};
