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
import { IAddTransationProps, IAddTransationState, IAddTransactionOccupant } from './transactionsInterfaces';
import * as moment from 'moment';
import * as math from 'mathjs';
import APIHelper from '../../helpers/apiHelper';
import { addError } from '../ErrorMessage/errorMessageActions';
import { IStore } from '../../interfaces/storeInterface';

class AddTransaction extends React.Component<IAddTransationProps, IAddTransationState> {
    constructor(props: IAddTransationProps) {
        super(props);

        this.state = {
            occupantArray: [],
            transactionDetails: { gross: null, date: new Date(), reference: null },
            allChecked: false,
        };
    }

    componentDidMount() {
        // this.getUserList(); ED! V3 needs to keep a list of app specific display names for this
    }

    public getUserList = () => {
        // ED! THis should be redux
        const request = APIHelper.apiCall<IAddTransactionOccupant[]>('GET', 'Users/GetUserInformation', this.props.loggedInOccupant.token);

        return request.then(json => this.initialiseState(json));
    }

    public initialiseState = (occupantArray: IAddTransactionOccupant[]) => {
        occupantArray.map(this.addChecking);
        this.setState({
            occupantArray,
        });
    }

    addChecking = (occupantArrayItem: IAddTransactionOccupant) => {
        Object.assign(occupantArrayItem, { checked: false }); // TODO: This should spread from props into state
    }

    updateCheck = (key: number) => {
        const checkbox = this.state.occupantArray.findIndex((occupant: IAddTransactionOccupant) => occupant.occupantId === key);
        const checkedUser: IAddTransactionOccupant[] = JSON.parse(JSON.stringify(this.state.occupantArray));
        checkedUser[checkbox].checked = !checkedUser[checkbox].checked;
        this.setState({ occupantArray: checkedUser });
    }

    updateCheckAll = () => {
        const checkedUser: IAddTransactionOccupant[] = JSON.parse(JSON.stringify(this.state.occupantArray));
        const allChecked = this.state.allChecked;

        checkedUser
            .filter(
                occupantArrayElement =>
                    occupantArrayElement.occupantId !== this.props.loggedInOccupant.occupantId,
        )
            .forEach((entry) => {
                entry.checked = !allChecked;
            },       this);
        this.setState({
            allChecked: !allChecked,
            occupantArray: checkedUser,
        });
    }

    handleFormSubmit = (formSubmitEvent: React.FormEvent<HTMLFormElement>) => {
        formSubmitEvent.preventDefault();
        const debtors = this.state.occupantArray.filter(item => item.checked === true);
        if (debtors.length === 0) {
            this.props.dispatch(addError('Please add debtors'));
        } else {
            const participants = math.add(debtors.length, 1);
            const value = this.state.transactionDetails.gross;
            const dividedgross = math
                .chain(value)
                .divide(participants)
                .round(2)
                .done();
            const dateISO = moment(this.state.transactionDetails.date).format();
            const payday = debtors.map((element: IAddTransactionOccupant) => {
                const transaction = {
                    debtor: element.occupantId,
                    creditor: this.props.loggedInOccupant.occupantId, // TODO: Rework this to allow any creditor and any debtors 
                    gross: dividedgross,
                    reference: this.state.transactionDetails.reference,
                    date: dateISO,
                    enteredBy: this.props.loggedInOccupant.occupantId,
                };
                return transaction;
            },                         this);

            // TODO: ED this should be redux too! 
            APIHelper.apiCall('POST', 'Transactions/AddTransactionsBulk', this.props.loggedInOccupant.token, null, payday)
                .then(() => {
                    this.setState({
                        transactionDetails: {
                            gross: null,
                            date: new Date(),
                            reference: null,
                        },
                        allChecked: false,
                    });
                })
                .then(() => this.initialiseState(this.state.occupantArray));
        }
    }

    createCheckbox(occupantArray: IAddTransactionOccupant): JSX.Element {
        const checkbox: JSX.Element = (
            <ListItem
                key={'ListItem_' + occupantArray.occupantId}
                onClick={this.updateCheck.bind(this, occupantArray.occupantId)}
            >
                <Checkbox
                    key={'Checkbox_' + occupantArray.occupantId}
                    label={
                        <UserChip
                            occupant={occupantArray}
                            styles={styles.occupantChip}
                        />}
                    checked={
                        this.state.occupantArray.find(occupant => occupant.occupantId === occupantArray.occupantId)
                            .checked
                    }
                    style={styles.checkbox}
                    iconStyle={styles.checkboxIcon}
                    onCheck={this.updateCheck.bind(this, occupantArray.occupantId)}
                    disabled={this.state.transactionAdding}
                />
            </ListItem>
        );
        return checkbox;
    }

    createCheckboxList = () => { // TODO: Refactor into stateless component?
        const checkboxList = this.state.occupantArray
            .filter(
                occupantArrayElement =>
                    occupantArrayElement.occupantId !== this.props.loggedInOccupant.occupantId,
        )
            .map(() => this.createCheckbox);
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
                <h3> Divided between {this.props.loggedInOccupant.displayName}, and: </h3>
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
                            {this.state.occupantArrayReturned ? (
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
    return { loggedInOccupant: store.occupantsReducer.loggedInOccupant };
};

export default connect(mapStateToProps)(AddTransaction);
