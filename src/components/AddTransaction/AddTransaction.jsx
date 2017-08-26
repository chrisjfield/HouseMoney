import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
//import Snackbar from "material-ui/Snackbar";
import DatePicker from "material-ui/DatePicker";
import apiCall from "../../helpers/apiHelper";
import Checkbox from "material-ui/Checkbox";
import update from "react-addons-update";

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
      addTransaction: { GROSS: 0, DATE: this.currentDate, REFERENCE: "" }
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
    const debtors = this.state.userList.filter(item => item.checked === true);
    const dividedGross = this.state.addTransaction.GROSS / (debtors.length + 1);
    debtors.forEach(function(element) {
      payday.push({
        DEBTOR: element.EMAILADDRESS,
        CREDITOR: this.props.loggedInUser.EMAILADDRESS,
        GROSS: dividedGross,
        REFERENCE: this.state.addTransaction.REFERENCE,
        DATE: this.state.addTransaction.DATE
      });
    }, this);
    apiCall("POST", "Transactions/AddTransactionsBulk", payday);
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
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;

    const newState = update(this.state, {
      addTransaction: {
        $merge: { [name]: value }
      }
    });
    this.setState(newState);
  }

  handleDateChange(dateObj) {
    const name = "DATE";

    const newState = update(this.state, {
      addTransaction: {
        $merge: { [name]: dateObj }
      }
    });
    this.setState(newState);
  }

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
            onChange={this.handleInputChange}
          />
        </div>
        <FlatButton type="submit" label="Add" />
      </form>
    );
  }
}

/* ED! Look into this for confirming submission of transaction
          <Snackbar
            open={this.state.transactionSaved}
            message="Transaction added"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
*/

// Retrieve data from store as props
const mapStateToProps = store => {
  return { loggedInUser: store.navReducer.loggedInUser.EMAILADDRESS };
};

export default connect(mapStateToProps)(AddTransaction);
