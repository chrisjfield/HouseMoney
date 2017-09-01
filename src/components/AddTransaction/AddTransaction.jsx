import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import DatePicker from "material-ui/DatePicker";
import CircularProgress from "material-ui/CircularProgress";
import Checkbox from "material-ui/Checkbox";
import ErrorMessage from "../ErrorMessage";
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
        marginTop: "50px"
      },
      checkbox: {
        margin: "0 auto",
        marginBottom: 16,
        float: "centre",
        width: "5%"
      },
      masterCheckbox: {
        margin: "0 auto",
        marginBottom: 16,
        float: "centre",
        width: "7%"
      }
    };
    this.currentDate = new Date();
    this.state = {
      userListReturned: false,
      userList: {},
      addTransaction: { GROSS: "", DATE: this.currentDate, REFERENCE: "" },
      transactionAdded: false,
<<<<<<< Updated upstream
      transactionAdding: false,
      error: { response: { ok: true, statusText: "" } }
=======
      allChecked: false,
      wrongDebtors: false
>>>>>>> Stashed changes
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
    // this works off references and the fact js refuses to deep clone
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
<<<<<<< Updated upstream
    this.setState({ transactionAdding: true });
    const debtors = this.state.userList.filter(item => item.checked === true),
      participants = math.add(debtors.length, 1),
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
          transactionAdding: false,
          addTransaction: { GROSS: "", DATE: this.currentDate, REFERENCE: "" }
        })
      )
      .then(this.initialiseState(this.state.userList))
      .catch(error => {
        this.setState({ error: error, transactionAdding: false });
      });
=======
    const debtors = this.state.userList.filter(item => item.checked === true);
    if (debtors.length === 0) {
      this.setState({ wrongDebtors: true });
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
            addTransaction: { GROSS: "", DATE: this.currentDate, REFERENCE: "" }
          })
        )
        .then(this.initialiseState(this.state.userList));
    }
>>>>>>> Stashed changes
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
        disabled={this.state.transactionAdding}
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

  handleWrongDebtorsClose = () => {
    this.setState({
      wrongDebtors: false
    });
  };

  render() {
    return (
      <form style={this.styles.container} onSubmit={this.handleFormSubmit}>
        <h2>Add a Transaction </h2>
        <h3>
          {" "}Creditor is {this.props.loggedInUser.FIRSTNAME}{" "}
          {this.props.loggedInUser.SURNAME}{" "}
        </h3>
        <h4>Debtors are:</h4>
        <div>
          {this.state.userListReturned
            ? this.createCheckboxList()
            : <CircularProgress />}
        </div>
        <div>
          <Checkbox
            key="checkall"
            label="Check All"
            checked={this.state.allChecked}
            onCheck={this.updateCheckAll}
            style={this.styles.masterCheckbox}
          />
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
            mode="landscape"
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
<<<<<<< Updated upstream
        <ErrorMessage error={this.state.error} />
=======
        <Snackbar
          open={this.state.wrongDebtors}
          message="Please add debtors"
          autoHideDuration={4000}
          onRequestClose={this.handleWrongDebtorsClose}
        />
>>>>>>> Stashed changes
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(AddTransaction);
