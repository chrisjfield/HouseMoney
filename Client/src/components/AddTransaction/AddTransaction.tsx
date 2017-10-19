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
import * as moment from 'moment';
import * as math from 'mathjs';
import APIHelper from '../../helpers/apiHelper';
import { IAddTransationProps, IAddTransationState, IAddTransactionUser } from './interfaces';
import styles from './styles';
import appStyles from '../../styles';

class AddTransaction extends React.Component<IAddTransationProps, IAddTransationState> {
    constructor(props: IAddTransationProps) {
        super(props);

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
        // this.getUserList(); ED! V3 needs to keep a list of app specific display names for this
    }

    public getUserList = () => {
        const request = APIHelper.apiCall('GET', 'Users/GetUserInformation');

        return request.then(json => this.initialiseState(json));
    }

    public initialiseState = (userList: IAddTransactionUser[]) => {
        userList.map(this.addChecking);
        this.setState({
            userList,
            userListReturned: true,
        });
    }

    addChecking = (userListItem: IAddTransactionUser) => {
        Object.assign(userListItem, { checked: false });
    }

    updateCheck = (key: number) => {
        const checkbox = this.state.userList.findIndex((user: IAddTransactionUser) => user.userId === key.toString());
        const checkedUser: IAddTransactionUser[] = JSON.parse(JSON.stringify(this.state.userList));
        checkedUser[checkbox].checked = !checkedUser[checkbox].checked;
        this.setState({ userList: checkedUser });
    }

    updateCheckAll = () => {
        const checkedUser: IAddTransactionUser[] = JSON.parse(JSON.stringify(this.state.userList));
        const allChecked = this.state.allChecked;

        checkedUser
        .filter(
            userListElement =>
                userListElement.userId !== this.props.loggedInUser.userId,
        )
        .forEach((entry) => {
            entry.checked = !allChecked;
        },       this);
        this.setState({
            allChecked: !allChecked,
            userList: checkedUser,
        });
    }

    handleFormSubmit = (formSubmitEvent: React.FormEvent<HTMLFormElement>) => {
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

    createCheckbox (userList: IAddTransactionUser): JSX.Element {
        const checkbox: JSX.Element = (
            <ListItem
                key={'ListItem_' + userList.userId}
                onClick={this.updateCheck.bind(this, userList.userId)}
            >
                <Checkbox
                    key={'Checkbox_' + userList.userId}
                    label={
                    <UserChip 
                        user={userList} 
                        styles={styles.userChip} 
                        dispatch={this.props.dispatch}
                        history={this.props.history}  
                    />}
                    checked={
                        this.state.userList.find(thing => thing.userId === userList.userId)
                            .checked
                    }
                    style={styles.checkbox}
                    iconStyle={styles.checkboxIcon}
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

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.updateAddTransaction<string | number>(event.target.name, event.target.value);
    }

    handleDateChange = (date: string) => {
        this.updateAddTransaction<string>('DATE', date);
    }

    updateAddTransaction = <T extends {}>(name: string, value: T)  =>  {
        this.setState(prevState => ({
            addTransaction: { ...this.state.addTransaction, [name]: value },
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
            <h3> Divided between {this.props.loggedInUser.displayName}, and: </h3>
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
                    defaultDate={this.state.currentDate}
                    value={this.state.addTransaction.DATE}
                    onChange={(event, dateObj) => {
                        this.handleDateChange(dateObj.toString());
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
const mapStateToProps = (store: any) => {
    return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(AddTransaction);
