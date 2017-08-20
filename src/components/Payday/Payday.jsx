import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
//import Snackbar from "material-ui/Snackbar";
import DatePicker from "material-ui/DatePicker";
import apiCall from "../../helpers/apiHelper";
import Checkbox from "material-ui/Checkbox";

class Payday extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      },
      checkbox: {
        margin: "0 auto",
        marginBottom: 16
      }
    };
    this.currentDate = new Date();
    this.state = {
      userListReturned: false,
      userList: {}
    };
    this.createCheckbox = this.createCheckbox.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
  }

  componentWillMount = () => {
    this.getUserList();
  };

  getUserList() {
    const request = apiCall("GET", "Users/GetUserInformation");

    return request.then(json =>
      this.setState({ userList: json, userListReturned: true })
    );
  }

  updateCheck(key) {
    this.setState(oldState => {
      return {
        checkboxList: { key: key, checked: !oldState.checkboxList.checked }
        // We need to fix this for multiples
      };
    });
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
  };

  createCheckbox = userList => {
    const checkbox = (
      <Checkbox
        key={userList.EMAILADDRESS}
        label={userList.EMAILADDRESS}
        checked={this.state.checked}
        onCheck={this.updateCheck.bind(this, userList.EMAILADDRESS)}
        style={this.styles.checkbox}
      />
    );
    return checkbox;
  };

  createCheckboxList = () => {
    const checkboxList = this.state.userList.map(this.createCheckbox);
    return checkboxList;
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
            type="number"
            hintText="0.00"
            floatingLabelText="Value"
            required
          />
        </div>
        <div>
          <DatePicker
            floatingLabelText="Date"
            autoOk={true}
            container="inline"
            mode="landscape"
            defaultDate={this.currentDate}
            required
          />
        </div>
        <div>
          <TextField
            type="text"
            hintText="Weekly Shop"
            floatingLabelText="Reference"
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
  return {};
};

export default connect(mapStateToProps)(Payday);
