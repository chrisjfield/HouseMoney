import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import DatePicker from "material-ui/DatePicker";
import apiCall from "../../helpers/apiHelper";
import Checkbox from "material-ui/Checkbox";
import update from "react-addons-update";
import moment from "moment";

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      },
      checkbox: {
        margin: "0 auto",
        marginBottom: 16,
        float: "centre",
        width: "5%"
      }
    };
    this.currentDate = new Date();
    this.state = {
      userListReturned: false,
      userList: {},
      addTransaction: { GROSS: "", DATE: this.currentDate, REFERENCE: "" },
      transactionAdded: false
    };
    this.createCheckbox = this.createCheckbox.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.addChecking = this.addChecking.bind(this);
    this.initialiseState = this.initialiseState.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillMount = () => {
    this.getUserList();
  };

  getUserList() {
    const request = apiCall("GET", "Users/GetUserInformation");

    return request.then(json => this.initialiseState(json));
  }

  initialiseState(userList) {
    userList.map(this.addChecking);
    this.setState({
      userList: userList,
      userListReturned: true
    });
  }

  addChecking(userListItem) {
    Object.assign(userListItem, { checked: false });
  }

  updateCheck(key) {
    // this works off references and the fact js refuses to deep clone
    let checkbox = this.state.userList.find(user => user.EMAILADDRESS === key);
    checkbox.checked = !checkbox.checked;
    this.setState(this.state);
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    let payday = [];
    const debtors = this.state.userList.filter(item => item.checked === true),
      dividedGross = this.state.addTransaction.GROSS / (debtors.length + 1),
      date = moment(this.state.addTransaction.DATE).format("YYYY MM DD");

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
          addTransaction: { GROSS: "", DATE: this.currentDate, REFERENCE: "" }
        })
      )
      .then(this.initialiseState(this.state.userList));
  };

  createCheckbox = userList => {
    const checkbox = (
      <Checkbox
        key={userList.EMAILADDRESS}
        label={userList.EMAILADDRESS}
        checked={
          this.state.userList.find(
            thing => thing.EMAILADDRESS === userList.EMAILADDRESS
          ).checked
        }
        onCheck={this.updateCheck.bind(this, userList.EMAILADDRESS)}
        style={this.styles.checkbox}
      />
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

  handleInputChange(event) {
    this.updateAddTransaction(event.target.name, event.target.value);
  }

  handleDateChange(date) {
    this.updateAddTransaction("DATE", date);
  }

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
        <h3> Creditor is . </h3>
        <div>
          {this.state.userListReturned ? this.createCheckboxList() : undefined}
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
          />
        </div>
        <div>
          <DatePicker
            name="DATE"
            floatingLabelText="Date"
            autoOk={true}
            container="inline"
            mode="landscape"
            defaultDate={this.currentDate}
            required
            value={this.state.addTransaction.DATE}
            onChange={(event, dateObj) => {
              this.handleDateChange(dateObj);
            }}
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
          />
        </div>
        <FlatButton type="submit" label="Add" />
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
