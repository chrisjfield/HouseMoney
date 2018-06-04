import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import * as redux from 'redux';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import appStyles from '../../styles';
import { ErrorMessageActions } from '../ErrorMessage/errorMessageActions';
import { getHouseholdOccupants } from '../Occupants/occupantsActions';
import { IOccupant } from '../Occupants/occupantsInterfaces';
import UserChip from '../UserChip';
import styles from './styles';
import { createTransactionArray, divideValueBetweenDebtors } from './transactionCalculations';
import { TransactionActions } from './transactionsActions';
// tslint:disable-next-line:max-line-length
import { IAddTransactionOccupant, IAddTransactionProps, IAddTransactionStore, IAddTransationState, ITransaction } from './transactionsInterfaces';

class AddTransaction extends React.Component<IAddTransactionProps, IAddTransationState> {
    constructor(props: IAddTransactionProps) {
        super(props);

        this.state = {
            occupantsArray: [],
            transactionDetails: { gross: 0.00, date: new Date(), reference: null },
            allChecked: false,
            transactionAdding: false,
            transactionAdded: false,
        };
    }

    componentDidMount() {
        const occupant = this.props.loggedInOccupant;
        this.props.dispatch(getHouseholdOccupants(occupant.token, occupant.userId, occupant.occupantId));
    }

    componentWillReceiveProps(nextProps: IAddTransactionProps) {
        if (nextProps.householdOccupantsArray.length > 0) {
            this.setState({ occupantsArray: nextProps.householdOccupantsArray });
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
            const dividedGross = divideValueBetweenDebtors(transactionDetails.gross, debtors.length);
            const dateISO: Date = moment(transactionDetails.date).toDate();
            const payday: ITransaction[] = createTransactionArray(
                debtors,
                me.occupantId,
                dividedGross,
                dateISO, // TODO: Check dates saving down! Think the timezones are still mesing up!
                transactionDetails.reference,
            );

            this.props.dispatch(TransactionActions.insertTransactions(me.token, me.userId, payday));
        }
    }

    createCheckbox = (occupant: IAddTransactionOccupant): JSX.Element => {
        const checkbox: JSX.Element = (
            <ListItem
                key={'ListItem_' + occupant.occupantId}
                onClick={this.updateCheck.bind(this, occupant.occupantId)}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            key={'Checkbox_' + occupant.occupantId}
                            checked={occupant.checked}
                            style={styles.checkbox}
                            onChange={this.updateCheck.bind(this, occupant.occupantId)}
                            disabled={this.state.transactionAdding}
                        />}
                    label={
                        <UserChip
                            occupant={occupant}
                            styles={styles.occupantChip}
                        />}
                />
            </ListItem>
        );
        return checkbox;
    }

    createCheckboxList = () => {
        const checkboxList = this.state.occupantsArray.map((occupant: IAddTransactionOccupant) => this.createCheckbox(occupant));
        return checkboxList;
    }

    handleInputChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(prevState => ({
            transactionDetails: { ...this.state.transactionDetails, [name]: event.target.value },
        }));
    }

    handleTransactionAddedClose = () => {
        this.setState({
            transactionAdded: false,
        });
        this.props.dispatch(TransactionActions.receiveTransaction(0));
    }

    handleViewTransactionClick = () => {
        this.props.history.push(houseMoneyRoutes.ViewTransactions);
    }

    // TODO: Change the number field to work! Maybe update MUI?
    render() {
        return (
            <form style={appStyles.container} onSubmit={this.handleFormSubmit}>
                <h2>Add a Transaction </h2>
                <h3> Divided between: </h3>
                <div>
                    <List>
                        <Paper style={styles.checkBoxListSheet}>
                            <ListItem key={'ListItem_checkAll'} onClick={this.updateCheckAll}>
                            <FormControlLabel
                                control={<Checkbox
                                    key="checkAll"
                                    checked={this.state.allChecked}
                                    onChange={this.updateCheckAll}
                                    style={styles.checkAll}
                                />}
                                label={'Everyone'}
                            />
                            </ListItem>
                            {this.props.loading === 0 ? (
                                this.createCheckboxList()
                            ) : (
                                    <CircularProgress />
                                )}
                        </Paper>
                    </List>
                </div>
                <div>
                    <TextField
                        name="gross"
                        type="number"
                        label="Value"
                        placeholder="0.00"
                        required
                        value={this.state.transactionDetails.gross}
                        onChange={this.handleInputChange(name)}
                        disabled={this.state.transactionAdding}
                    />
                </div>
                <div>
                    // TODO: REPLACE DATE FIELD HERE ED!
                </div>
                <div>
                    <TextField
                        name="reference"
                        type="text"
                        label="Description"
                        placeholder="Weekly Shop"
                        value={this.state.transactionDetails.reference}
                        onChange={this.handleInputChange(name)}
                        disabled={this.state.transactionAdding}
                    />
                </div>
                <Button
                    type="submit"
                    variant="outlined"
                    disabled={this.state.transactionAdding}>
                Add
                </Button>
                <Snackbar
                    open={this.state.transactionAdded}
                    message={<span id="positive-message-id">Transaction added</span>}
                    autoHideDuration={4000}
                    onClose={this.handleTransactionAddedClose}
                    action={
                        <Button key="view" color="secondary" size="small" onClick={this.handleViewTransactionClick}>
                        View
                        </Button>
                    }
                />
            </form>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: IStore) => {
    const householdOccupantsArray: IAddTransactionOccupant[] = store.occupantsReducer.householdOccupantsArray.map((occupant: IOccupant) => {
        const transactionOccupant: IAddTransactionOccupant = { ...occupant, checked: false };
        return transactionOccupant;
    });
    const props: IAddTransactionStore = {
        householdOccupantsArray,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        isLoggedIn: store.occupantsReducer.isLoggedIn,
        loading: store.loadingReducer.loading,
        transactionsAdded: store.transactionsReducer.transactionsAdded,
    };
    return props;
};

const mapDispatchToProps = (dispatch: redux.Dispatch<redux.Action>) =>
  redux.bindActionCreators(TransactionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
