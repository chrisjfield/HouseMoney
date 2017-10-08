import * as React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import DatePicker from 'material-ui/DatePicker';
import CircularProgress from 'material-ui/CircularProgress';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import UserChip from '../UserChip';
import { addError } from '../ErrorMessage/errorMessageActions';
import * as update from 'react-addons-update';
import * as moment from 'moment';
import * as math from 'mathjs';
import APIHelper from '../../helpers/apiHelper';
import { AddTransationProps, AddTransationState, AddTransactionUser } from './interfaces';
import { InputChangeEvent } from '../../interfaces/inputInterfaces';

class AddTransaction extends React.Component<AddTransationProps, AddTransationState> {
    constructor(props: AddTransationProps) {
        super(props);
        // this.styles = {
        //     container: {
        //         textAlign: 'center',
        //         marginTop: '20px',
        //     },
        //     checkbox: {
        //         display: 'inline-flex',
        //     },
        //     checkboxIcon: {
        //         paddingTop: '2px',
        //     },
        //     checkAll: {
        //         display: 'inline-flex',
        //         textAlign: 'left',
        //     },
        //     userChip: {
        //         display: 'inline-flex',
        //         width: 'inherit',
        //         overflow: 'hidden',
        //     },
        //     checkBoxListSheet: {
        //         width: '256px',
        //         textAlign: 'center',
        //         display: 'inline-block',
        //     },
        // };
        this.state = {
            userListReturned: false,
            userList: [],
            addTransaction: { GROSS: '', DATE: new Date(), REFERENCE: '' },
            transactionAdded: false,
            transactionAdding: false,
            allChecked: false,
            error: null,
            currentDate: new Date(),
        };
    }

    componentWillMount() {
        // this.getUserList();
    }

    public getUserList = () => {
        const request = APIHelper.apiCall('GET', 'Users/GetUserInformation');

        return request.then(json => this.initialiseState(json));
    }

    public initialiseState = (userList: AddTransactionUser[]) => {
        userList.map(this.addChecking);
        this.setState({
            userList,
            userListReturned: true,
        });
    }

    addChecking = (userListItem: AddTransactionUser) => {
        Object.assign(userListItem, { checked: false });
    }

    updateCheck = (key: number) => {
        const checkbox = this.state.userList.findIndex((user: AddTransactionUser) => user.userId === key.toString());
        const checkedUser: AddTransactionUser[] = JSON.parse(JSON.stringify(this.state.userList));
        checkedUser[checkbox].checked = !checkedUser[checkbox].checked;
        this.setState({ userList: checkedUser });
    }

    updateCheckAll = () => {
        const checkedUser: AddTransactionUser[] = JSON.parse(JSON.stringify(this.state.userList));
        checkedUser
        .filter(
            userListElement =>
                userListElement.userId !== this.props.loggedInUser.userId,
        )
        .forEach(function (entry) {
            entry.checked = !this.state.allChecked;
        },       this);
        this.setState({
            allChecked: !this.state.allChecked,
            userList: checkedUser,
        });
    }

    handleFormSubmit = (formSubmitEvent: React.FormEvent<HTMLInputElement>) => {
        formSubmitEvent.preventDefault();
        const debtors = this.state.userList.filter(item => item.checked === true);
        if (debtors.length === 0) {
            this.props.dispatch(addError('Please add debtors'));
        } else {
            const participants = math.add(debtors.length, 1);
            const value = this.state.addTransaction.GROSS;
            const dividedGross = math
                .chain(value)
                .divide(participants)
                .round(2)
                .done();
            const date = moment(this.state.addTransaction.DATE).format('YYYY MM DD');
            const payday = debtors.map((element) => {
                const transaction = {
                    DEBTOR: element.userId,
                    CREDITOR: this.props.loggedInUser.userId,
                    GROSS: dividedGross,
                    REFERENCE: this.state.addTransaction.REFERENCE,
                    DATE: date,
                };
                return transaction;
            },                         this);

            APIHelper.apiCall('POST', 'Transactions/AddTransactionsBulk', payday)
            .then(() => {
                this.setState({
                    transactionAdded: true,
                    addTransaction: {
                        GROSS: '',
                        DATE: this.state.currentDate,
                        REFERENCE: '' },
                    allChecked: false,
                });
            })
            .then(() => this.initialiseState(this.state.userList));
        }
    }

    createCheckbox (userList: AddTransactionUser[]): JSX.Element {
        const checkbox: JSX.Element = (
            <ListItem
                key={'ListItem_' + userList.email}
                onClick={this.updateCheck.bind(this, userList.email)}
            >
                <Checkbox
                    key={'Checkbox_' + userList.email}
                    label={<UserChip user={userList} styles={this.styles.userChip} />}
                    checked={
                        this.state.userList.find(thing => thing.email === userList.email)
                            .checked
                    }
                    style={this.styles.checkbox}
                    iconStyle={this.styles.checkboxIcon}
                    onCheck={this.updateCheck.bind(this, userList.userId)}
                    disabled={this.state.transactionAdding}
                />
            </ListItem>
        );
        return checkbox;
    }

    createCheckboxList = () => {
        const checkboxList = this.state.userList
        .filter(
            userListElement =>
                userListElement.userId !== this.props.loggedInUser.userId,
        )
        .map(() => this.createCheckbox);
        return checkboxList;
    }

    handleInputChange = (event: InputChangeEvent<string | number>) => {
        this.updateAddTransaction(event.target.name, event.target.value);
    }

    handleDateChange = (date: string) => {
        this.updateAddTransaction('DATE', date);
    }

    updateAddTransaction = (name: string, value: string | number) => {
        const newState = update(this.state, {
            addTransaction: {
                $merge: { [name]: value },
            },
        });
        this.setState(newState);
    }

    handleTransactionAddedClose = () => {
        this.setState({
            transactionAdded: false,
        });
    }

    render() {
        return (
        <form style={this.styles.container} onSubmit={this.handleFormSubmit}>
            <h2>Add a Transaction </h2>
            <h3> Divided between {this.props.loggedInUser.displayName}, and: </h3>
            <div>
                <List>
                    <Paper style={this.styles.checkBoxListSheet}>
                        <ListItem key={'ListItem_checkAll'} onClick={this.updateCheckAll}>
                            <Checkbox
                                key="checkAll"
                                label="Everyone"
                                checked={this.state.allChecked}
                                onCheck={this.updateCheckAll}
                                style={this.styles.checkAll}
                            />
                        </ListItem>
                        {this.state.userListReturned ? (
                            this.createCheckboxList()
                        ) : (
                            <CircularProgress />
                        )}
                    </Paper>
                </List>
            </div>
            <div>
                <TextField
                    name="GROSS"
                    type="number"
                    hintText="0.00"
                    floatingLabelText="Value"
                    required
                    value={this.state.addTransaction.GROSS}
                    onChange={this.handleInputChange}
                    disabled={this.state.transactionAdding}
                />
            </div>
            <div>
                <DatePicker
                    name="DATE"
                    floatingLabelText="Date"
                    autoOk={true}
                    container="inline"
                    style={{ display: 'inline-block' }}
                    defaultDate={this.currentDate}
                    required
                    value={this.state.addTransaction.DATE}
                    onChange={(event, dateObj) => {
                        this.handleDateChange(dateObj);
                    }}
                    disabled={this.state.transactionAdding}
                />
            </div>
            <div>
                <TextField
                    name="REFERENCE"
                    type="text"
                    hintText="Weekly Shop"
                    floatingLabelText="Reference"
                    value={this.state.addTransaction.REFERENCE}
                    onChange={this.handleInputChange}
                    disabled={this.state.transactionAdding}
                    maxLength="200"
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
const mapStateToProps = (store: any) => {
    return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(AddTransaction);