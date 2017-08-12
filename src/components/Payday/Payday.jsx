import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import DatePicker from "material-ui/DatePicker";
import Checkbox from "./Checkbox";
import { getUserList } from "./paydayActions";

const items = ["One", "Two", "Three"];

class Payday extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        textAlign: "center",
        "margin-top": "50px"
      }
    };
  }

  componentWillMount = () => {
    const { dispatch } = this.props;
    dispatch(getUserList());
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, "is selected.");
    }
  };

  createCheckbox = label =>
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />;

  createCheckboxes = () => items.map(this.createCheckbox);

  render() {
    return (
      <form style={this.styles.container} onSubmit={this.handleFormSubmit}>
        <h1>Add a Transaction </h1>
        <h2> Creditor is . </h2>
        {this.createCheckboxes()}
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
function mapStateToProps(state) {
  return {
    //showAddUser: getShowAddUser(state),
    //users: postUser(state) // ED! this was firing post user when sub clicked... need to understand wtf this is doing / for
  };
}

export default connect(mapStateToProps)(Payday);
