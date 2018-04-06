import * as React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import UserChip from '../UserChip';
import styles from './styles';
import appStyles from '../../styles';
import {
    IAddTransactionProps,
    IAddTransationState,
    IAddTransactionOccupant,
    IAddTransactionStore,
    ITransaction,
} from './transactionsInterfaces';
import * as moment from 'moment';
import * as math from 'mathjs';
import { addError } from '../ErrorMessage/errorMessageActions';
import { IStore } from '../../interfaces/storeInterface';
import { getHouseholdOccupants } from '../Occupants/occupantsActions';
import { IOccupant } from '../Occupants/occupantsInterfaces';
import { insertTransactions } from './transactionsActions';

class AddTransaction extends React.Component<IAddTransactionProps, IAddTransationState> {
    constructor(props: IAddTransactionProps) {
        super(props);

        this.state = {
            occupantsArray: [],
            transactionDetails: { gross: null, date: new Date(), reference: null },
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
        const debtors = this.state.occupantsArray.filter(item => item.checked === true);
        const participants = debtors.length;
        if (participants === 0) {
            this.props.dispatch(addError('Please add debtors'));
        } else {
            const value = this.state.transactionDetails.gross;
            const dividedGross = math
                .chain(value)
                .divide(participants)
                .round(2)
                .done();
            const dateISO: Date = moment(this.state.transactionDetails.date).toDate();
            const payday: ITransaction[] = debtors.map((element: IAddTransactionOccupant) => {
                const transaction = {
                    debtor: element.occupantId,
                    creditor: this.props.loggedInOccupant.occupantId,
                    gross: dividedGross,
                    reference: this.state.transactionDetails.reference,
                    date: dateISO,
                    enteredBy: this.props.loggedInOccupant.occupantId,
                };
                return transaction;
            },                                         this);
            const occupant = this.props.loggedInOccupant;
            this.props.dispatch(insertTransactions(occupant.token, occupant.userId, payday));
        }
    }

    createCheckbox = (occupant: IAddTransactionOccupant): JSX.Element => {
        const checkbox: JSX.Element = (
            <ListItem
                key={'ListItem_' + occupant.occupantId}
                onClick={this.updateCheck.bind(this, occupant.occupantId)}
            >
                <Checkbox
                    key={'Checkbox_' + occupant.occupantId}
                    label={
                        <UserChip
                            occupant={occupant}
                            styles={styles.occupantChip}
                        />}
                    checked={occupant.checked}
                    style={styles.checkbox}
                    iconStyle={styles.checkboxIcon}
                    onCheck={this.updateCheck.bind(this, occupant.occupantId)}
                    disabled={this.state.transactionAdding}
                />
            </ListItem>
        );
        return checkbox;
    }

    createCheckboxList = () => { // TODO: Refactor into stateless component?
        const checkboxList = this.state.occupantsArray.map((occupant: IAddTransactionOccupant) => this.createCheckbox(occupant));
        return checkboxList;
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.updateAddTransaction<string | number>(event.target.name, event.target.value);
    }

    handledateChange = (date: string) => {
        this.updateAddTransaction<string>('date', date);
    }

    updateAddTransaction = <T extends {}>(name: string, value: T) => {
        this.setState(prevState => ({
            transactionDetails: { ...this.state.transactionDetails, [name]: value },
        }));
    }

    handleTransactionAddedClose = () => {
        this.setState({
            transactionAdded: false,
        });
    }

    render() {
        return (
            <form style={appStyles.container} onSubmit={this.handleFormSubmit}>
                <h2>Add a Transaction </h2>
                <h3> Divided between: </h3>
                <div>
                    <List>
                        <Paper style={styles.checkBoxListSheet}>
                            <ListItem key={'ListItem_checkAll'} onClick={this.updateCheckAll}>
                                <Checkbox
                                    key="checkAll"
                                    label="Everyone"
                                    checked={this.state.allChecked}
                                    onCheck={this.updateCheckAll}
                                    style={styles.checkAll}
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
                        hintText="0.00"
                        floatingLabelText="Value"
                        required
                        value={this.state.transactionDetails.gross}
                        onChange={this.handleInputChange}
                        disabled={this.state.transactionAdding}
                    />
                </div>
                <div>
                    <DatePicker
                        name="date"
                        floatingLabelText="date"
                        autoOk={true}
                        container="inline"
                        style={{ display: 'inline-block' }}
                        defaultDate={new Date()}
                        value={this.state.transactionDetails.date}
                        onChange={(event, dateObj) => {
                            this.handledateChange(dateObj.toString());
                        }}
                        disabled={this.state.transactionAdding}
                    />
                </div>
                <div>
                    <TextField
                        name="reference"
                        type="text"
                        hintText="Weekly Shop"
                        floatingLabelText="reference"
                        value={this.state.transactionDetails.reference}
                        onChange={this.handleInputChange}
                        disabled={this.state.transactionAdding}
                        maxlength="200"
                    />
                </div>
                <FlatButton
                    type="submit"
                    label="Add"
                    disabled={this.state.transactionAdding}
                />
                <Snackbar
                    open={this.state.transactionAdded}
                    message="Transaction added"
                    autoHideDuration={4000}
                    onRequestClose={this.handleTransactionAddedClose}
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

export default connect(mapStateToProps)(AddTransaction);
