import { Avatar, Button, Divider, ListItemIcon, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Paper from '@material-ui/core/Paper/Paper';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField/TextField';
import DatePicker from 'material-ui-pickers/DatePicker';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import { ErrorMessageActions } from '../ErrorMessage/errorMessageActions';
import Loading from '../Loading';
import { LoadingActions } from '../Loading/loadingActions';
import MessageSnackbarContent from '../MessageSnackbarContent';
import { OccupantsActions } from '../Occupants/occupantsActions';
import { IOccupant, IOccupantDetails } from '../Occupants/occupantsInterfaces';
import addTransactionStyles from './addTransactionStyles';
import { createTransactionArray, divideValueBetweenDebtors } from './transactionCalculations';
import { TransactionActions } from './transactionsActions';
// tslint:disable-next-line:max-line-length
import { IAddTransactionOccupant, IAddTransactionProps, IAddTransactionRequest, IAddTransactionStore, IAddTransationState, ITransaction } from './transactionsInterfaces';

class AddTransaction extends React.Component<IAddTransactionProps, IAddTransationState> {
    constructor(props: IAddTransactionProps) {
        super(props);

        this.state = {
            occupantsArray: [],
            transactionDetails: { gross: '', date: new Date(), reference: '' },
            allChecked: false,
            transactionAdding: false,
            transactionAdded: false,
        };
    }

    componentDidMount() {
        const occupantDetails: IOccupantDetails = this.props.loggedInOccupant;
        this.props.dispatch(OccupantsActions.getHouseholdOccupants(occupantDetails));
    }

    componentWillReceiveProps(nextProps: IAddTransactionProps) {
        if (nextProps.transactionOccupantsArray.length > 0) {
            this.setState({ occupantsArray: nextProps.transactionOccupantsArray });
        }
        if (nextProps.transactionsAdded) {
            this.setState({ transactionAdded: nextProps.transactionsAdded });
        }
    }

    updateCheck = (key: number) => {
        const checkbox = this.state.occupantsArray.findIndex((occupant: IAddTransactionOccupant) => occupant.occupantId === key);
        const checkedUser: IAddTransactionOccupant[] = JSON.parse(JSON.stringify(this.state.occupantsArray));
        checkedUser[checkbox].checked = !checkedUser[checkbox].checked;
        this.setState({ occupantsArray: checkedUser });
    }

    updateCheckAll = () => {
        const checkedUser: IAddTransactionOccupant[] = JSON.parse(JSON.stringify(this.state.occupantsArray));
        const allChecked = this.state.allChecked;

        checkedUser.map((entry) => { entry.checked = !allChecked; }, this);
        this.setState({
            allChecked: !allChecked,
            occupantsArray: checkedUser,
        });
    }

    handleFormSubmit = (formSubmitEvent: React.FormEvent<HTMLFormElement>) => {
        formSubmitEvent.preventDefault();
        const me = this.props.loggedInOccupant;
        const debtors = this.state.occupantsArray.filter(item => (item.checked));
        const transactionDetails = this.state.transactionDetails;

        if (debtors.filter(item => item.occupantId !== me.occupantId).length === 0) {
            this.props.dispatch(ErrorMessageActions.addError('Please add others to divide between'));
        } else {
            const dividedGross = divideValueBetweenDebtors(transactionDetails.gross as number, debtors.length);
            const payday: ITransaction[] = createTransactionArray(
                debtors,
                me.occupantId,
                dividedGross,
                transactionDetails.date,
                transactionDetails.reference,
            );
            const addTransactionRequest: IAddTransactionRequest = {
                token: me.token,
                userId: me.userId,
                transactionArray: payday,
            };

            this.props.dispatch(LoadingActions.loadingStarted());
            this.props.dispatch(TransactionActions.addTransaction(addTransactionRequest));
            this.setState({
                transactionDetails: { gross: '', date: new Date(), reference: '' },
                allChecked: false,
                transactionAdding: false,
                transactionAdded: false,
            });
        }
    }

    // TODO: Refactor this out!
    // TODO: Use flex-box properly here Ed!
    createCheckbox = (occupant: IAddTransactionOccupant): JSX.Element => {
        const { classes } = this.props;
        const checkbox: JSX.Element = (
            <ListItem
                key={'ListItem_' + occupant.occupantId}
                onClick={this.updateCheck.bind(this, occupant.occupantId)}
                style={{
                    cursor: 'auto',
                    width: 'auto',
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            key={'Checkbox_' + occupant.occupantId}
                            checked={occupant.checked}
                            className={classes.checkbox}
                            onChange={this.updateCheck.bind(this, occupant.occupantId)}
                            disabled={this.state.transactionAdding}
                        />}
                    label={occupant.displayName}
                />
                <ListItemIcon style={{ marginLeft: 'auto' }}>
                    <Avatar key={'Avatar_' + occupant.displayName} className={classes.avatar} >
                        {occupant.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                </ListItemIcon>
            </ListItem>
        );
        return checkbox;
    }

    createCheckboxList = () => {
        const checkboxList = this.state.occupantsArray.map((occupant: IAddTransactionOccupant) => this.createCheckbox(occupant));
        return checkboxList;
    }

    handleInputChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            transactionDetails: { ...this.state.transactionDetails, [name]: event.target.value },
        });
    }

    handleDateChange = (date: Date) => {
        this.setState({ transactionDetails: { ...this.state.transactionDetails, date } });
    }

    handleTransactionAddedClose = (event: React.MouseEvent<HTMLElement>, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            transactionAdded: false,
        });
        this.props.dispatch(TransactionActions.receiveTransaction(0));
    }

    handleViewTransactionClick = () => {
        this.props.history.push(houseMoneyRoutes.ViewTransactions);
    }

    // TODO: Improve reference/description field - don't like vertical arrows!
    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} onSubmit={this.handleFormSubmit}>
                <Typography variant="headline"> Add Transaction </Typography>
                <Typography variant="subheading"> Divided between: </Typography>
                <div>
                    <List>
                        <Paper
                            className={classes.checkBoxListSheet}
                        >
                            <ListItem key={'ListItem_checkAll'} onClick={this.updateCheckAll}>
                                <FormControlLabel
                                    control={<Checkbox
                                        key="checkAll"
                                        checked={this.state.allChecked}
                                        onChange={this.updateCheckAll}
                                        className={classes.checkAll}
                                    />}
                                    label={'Everyone'}
                                />
                            </ListItem>
                            <Divider />
                            {this.props.loading === 0 ? (
                                this.createCheckboxList()
                            ) : (
                                    <Loading />
                                )}
                        </Paper>
                    </List>
                </div>
                <div>
                    <TextField
                        id="gross"
                        type="number"
                        label="Value"
                        placeholder="0.00"
                        required
                        value={this.state.transactionDetails.gross}
                        onChange={this.handleInputChange('gross')}
                        disabled={this.state.transactionAdding}
                        margin="normal"
                    />
                </div>
                <div>
                    <DatePicker
                        id="date"
                        label="Date"
                        required
                        value={this.state.transactionDetails.date}
                        onChange={this.handleDateChange}
                        disabled={this.state.transactionAdding}
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        id="reference"
                        type="text"
                        label="Description"
                        placeholder="Weekly Shop"
                        multiline={true}
                        rowsMax="5"
                        value={this.state.transactionDetails.reference}
                        onChange={this.handleInputChange('reference')}
                        disabled={this.state.transactionAdding}
                        margin="normal"
                    />
                </div>
                <Button
                    type="submit"
                    variant="outlined"
                    disabled={this.state.transactionAdding}
                >
                    Add
                </Button>
                <Snackbar
                    open={this.state.transactionAdded}
                    autoHideDuration={4000}
                    onClose={this.handleTransactionAddedClose}
                >
                    <MessageSnackbarContent
                        onClose={this.handleTransactionAddedClose}
                        variant="success"
                        message="Transaction added"
                        additionalActions={
                            <Button key="view" size="small" onClick={this.handleViewTransactionClick}>
                                View
                            </Button>
                        }
                    />
                </Snackbar>
            </form>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    const transactionOccupantsArray: IAddTransactionOccupant[] =
        store.occupantsReducer.householdOccupantsArray.map((occupant: IOccupant) => {
            const transactionOccupant: IAddTransactionOccupant = { ...occupant, checked: false };
            return transactionOccupant;
        });
    const props: IAddTransactionStore = {
        transactionOccupantsArray,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        loading: store.loadingReducer.loading,
        transactionsAdded: store.transactionsReducer.transactionsAdded,
    };
    return props;
};

export default compose(withStyles(addTransactionStyles), connect(mapStateToProps))(AddTransaction);
