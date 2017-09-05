import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import DatePicker from "material-ui/DatePicker";
import CircularProgress from "material-ui/CircularProgress";
import Checkbox from "material-ui/Checkbox";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import UserChip from "../UserChip";
import { addError } from "../ErrorMessage/errorMessageActions";
import update from "react-addons-update";
import moment from "moment";
import math from "mathjs";
import apiCall from "../../helpers/apiHelper";

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "20px"
      },
      checkbox: {
        display: "inline-flex"
      },
      checkboxIcon: {
        paddingTop: "2px"
      },
      checkAll: {
        display: "inline-flex",
        textAlign: "left"
      },
      userChip: {
        display: "inline-flex"
      },
      checkBoxListSheet: {
        width: "256px",
        textAlign: "center",
        display: "inline-block"
      }
    };
    this.currentDate = new Date();
    this.state = {
      userListReturned: false,
      userList: {},
      addTransaction: { GROSS: "", DATE: this.currentDate, REFERENCE: "" },
      transactionAdded: false,
      transactionAdding: false,
      allChecked: false,
      error: null
    };
  }

  componentWillMount = () => {
    this.getUserList();
  };

  getUserList = () => {
    const request = apiCall("GET", "Users/GetUserInformation");

    return request.then(json => this.initialiseState(json));
  };

  initialiseState = userList => {
    userList.map(this.addChecking);
    this.setState({
      userList: userList,
      userListReturned: true
    });
  };

  addChecking = userListItem => {
    Object.assign(userListItem, { checked: false });
  };

  updateCheck = key => {
    let checkbox = this.state.userList.findIndex(
      user => user.EMAILADDRESS === key
    );
    let checkedUser = JSON.stringify(this.state.userList);
    checkedUser = JSON.parse(checkedUser);
    checkedUser[checkbox].checked = !checkedUser[checkbox].checked;
    this.setState({ userList: checkedUser });
  };

  updateCheckAll = () => {
    let checkedUser = JSON.stringify(this.state.userList);
    checkedUser = JSON.parse(checkedUser);
    checkedUser
      .filter(
        userListElement =>
          userListElement.EMAILADDRESS !== this.props.loggedInUser.EMAILADDRESS
      )
      .forEach(function(entry) {
        entry.checked = !this.state.allChecked;
      }, this);
    this.setState({
      allChecked: !this.state.allChecked,
      userList: checkedUser
    });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    const debtors = this.state.userList.filter(item => item.checked === true);
    if (debtors.length === 0) {
      this.props.dispatch(addError("Please add debtors"));
    } else {
      const participants = math.add(debtors.length, 1),
        value = this.state.addTransaction.GROSS,
        dividedGross = math.chain(value).divide(participants).round(2).done(),
        date = moment(this.state.addTransaction.DATE).format("YYYY MM DD"),
        payday = debtors.map(element => {
          const transaction = {
            DEBTOR: element.EMAILADDRESS,
            CREDITOR: this.props.loggedInUser.EMAILADDRESS,
            GROSS: dividedGross,
            REFERENCE: this.state.addTransaction.REFERENCE,
            DATE: date
          };
          return transaction;
        }, this);

      apiCall("POST", "Transactions/AddTransactionsBulk", payday)
        .then(
          this.setState({
            transactionAdded: true,
            addTransaction: {
              GROSS: "",
              DATE: this.currentDate,
              REFERENCE: ""
            },
            allChecked: false
          })
        )
        .then(this.initialiseState(this.state.userList));
    }
  };

  createCheckbox = userList => {
    const checkbox = (
      <ListItem
        key={"ListItem_" + userList.EMAILADDRESS}
        onClick={this.updateCheck.bind(this, userList.EMAILADDRESS)}
      >
        <Checkbox
          key={"Checkbox_" + userList.EMAILADDRESS}
          label={<UserChip user={userList} styles={this.styles.userChip} />}
          checked={
            this.state.userList.find(
              thing => thing.EMAILADDRESS === userList.EMAILADDRESS
            ).checked
          }
          style={this.styles.checkbox}
          iconStyle={this.styles.checkboxIcon}
          onCheck={this.updateCheck.bind(this, userList.EMAILADDRESS)}
          disabled={this.state.transactionAdding}
        />
      </ListItem>
    );
    return checkbox;
  };

  createCheckboxList = () => {
    const checkboxList = this.state.userList
      .filter(
        userListElement =>
          userListElement.EMAILADDRESS !== this.props.loggedInUser.EMAILADDRESS
      )
      .map(this.createCheckbox);
    return checkboxList;
  };

  handleInputChange = event => {
    this.updateAddTransaction(event.target.name, event.target.value);
  };

  handleDateChange = date => {
    this.updateAddTransaction("DATE", date);
  };

  updateAddTransaction = (name, value) => {
    const newState = update(this.state, {
      addTransaction: {
        $merge: { [name]: value }
      }
    });
    this.setState(newState);
  };

  handleTransactionAddedClose = () => {
    this.setState({
      transactionAdded: false
    });
  };

  render() {
    return (
      <form style={this.styles.container} onSubmit={this.handleFormSubmit}>
        <h2>Add a Transaction </h2>
        <h3>
          {" "}Divided between {this.props.loggedInUser.EMAILADDRESS}, and:{" "}
        </h3>
        <div>
          <List>
            <Paper style={this.styles.checkBoxListSheet}>
              <ListItem key={"ListItem_checkAll"} onClick={this.updateCheckAll}>
                <Checkbox
                  key="checkAll"
                  label="Everyone"
                  checked={this.state.allChecked}
                  onCheck={this.updateCheckAll}
                  style={this.styles.checkAll}
                />
              </ListItem>
              {this.state.userListReturned
                ? this.createCheckboxList()
                : <CircularProgress />}
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
            style={{ display: "inline-block" }}
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
const mapStateToProps = store => {
  return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(AddTransaction);
