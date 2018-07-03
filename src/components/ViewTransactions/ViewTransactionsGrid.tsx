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

export const ViewTransactionsGrid: React.StatelessComponent<IViewTransactionGridProps> = (props) => {
    const { classes } = props;
    const transactionsGrid: JSX.Element = (
        <div style={{ overflow: 'auto', maxWidth: '100%' }}>
            <Table key="ViewTransactionsGridTable" >
                <TableHead key="TableHeader">
                    <TableRow key="TableHeaderRow">
                        <Tooltip id="tooltip-top" title="The name of the person who owes you" placement="top">
                            <TableCell
                                key={'Column_Debtor'}
                                className={classes.owesMeWidth}
                            >
                                <Typography variant="subheading">Owes Me</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The amount you are owed" placement="top">
                            <TableCell
                                key={'Column_Gross'}
                                className={classes.valueWidth}
                            >
                                <Typography variant="subheading">Value</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The date of the transaction" placement="top">
                            <TableCell
                                key={'Column_Date'}
                                className={classes.dateWidth}
                            >
                                <Typography variant="subheading">Date</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The transaction description" placement="top">
                            <TableCell
                                key={'Column_Reference'}
                                className={classes.referenceWidth}
                            >
                                <Typography variant="subheading">Description</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The person who added this transaction" placement="top">
                            <TableCell
                                key={'Column_EnteredBy'}
                                className={classes.owesMeWidth}
                            >
                                <Typography variant="subheading">Added By</Typography>
                            </TableCell>
                        </Tooltip>
                        <Tooltip id="tooltip-top" title="The date when this transaction was added" placement="top">
                            <TableCell
                                key={'Column_EnteredDate'}
                                className={classes.dateWidth}
                            >
                                <Typography variant="subheading">Date Added</Typography>
                            </TableCell>
                        </Tooltip>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.transactionHistoryArray.map((transaction: ITransactionHistory) =>
                        <ViewTransactionsGridRow
                            key={'ViewTransactionsGridRow_' + transaction.transactionId}
                            classes={classes}
                            {...transaction}
                        />,
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
    const { classes } = props;
    return (
        <TableRow key={'Row_' + props.transactionId}>
            <TableCell
                key={'Data_' + props.transactionId + '_Debtor'}
                className={classes.owesMeWidth}
            >
                <Typography color="textSecondary">{props.debtorDisplayName}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_Gross'}
                className={classes.valueWidth}
            >
                <Typography color="textSecondary">{props.gross}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_Date'}
                className={classes.dateWidth}
            >
                <Typography color="textSecondary">{formattedDate}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_Reference'}
                className={classes.referenceWidth}
            >
                <Typography color="textSecondary">{props.reference}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_EnteredBy'}
                className={classes.owesMeWidth}
            >
                <Typography color="textSecondary">{props.enteredByDisplayName}</Typography>
            </TableCell>
            <TableCell
                key={'Data_' + props.transactionId + '_EnteredDate'}
                className={classes.dateWidth}
            >
                <Typography color="textSecondary">{formattedEnteredDate}</Typography>
            </TableCell>
        </TableRow>
    );
};
