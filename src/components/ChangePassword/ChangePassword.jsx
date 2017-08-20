import React, { Component } from "react";
import update from "react-addons-update";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import apiCall from "../../helpers/apiHelper";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordUpdate: {
        EMAILADDRESS: "",
        CURRENTPASSWORD: "",
        NEWPASSWORD: "",
        NEWPASSWORDCONFIRM: ""
      },
      passwordUpdated: false
    };
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      passwordUpdate: { EMAILADDRESS: this.props.loggedInUser }
    });
  }

  handlePasswordChange(event) {
    event.preventDefault();
    const updatePassword = this.state.passwordUpdate,
      request = apiCall("PUT", "Users/UpdateUserPassword", updatePassword);

    return request.then(json => this.setState({ json, passwordUpdated: true }));
  }

  handleInputChange(event) {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;

    const newState = update(this.state, {
      passwordUpdate: {
        $merge: { [name]: value }
      }
    });
    this.setState(newState);
  }

  handleRequestClose = () => {
    this.setState({
      passwordUpdated: false
    });
  };

  render() {
    return (
      <form style={this.styles.container} onSubmit={this.handlePasswordChange}>
        <h2>Change Password</h2>
        <div>
          <TextField
            name="CURRENTPASSWORD"
            type="password"
            hintText="************"
            floatingLabelText="Current Password"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <TextField
            name="NEWPASSWORD"
            type="password"
            hintText="************"
            floatingLabelText="New Password"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <TextField
            name="NEWPASSWORDCONFIRM"
            type="password"
            hintText="************"
            floatingLabelText="Confirm Password"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <FlatButton type="submit" label="Update" />
        <Snackbar
          open={this.state.passwordUpdated}
          message="Password updated"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return { loggedInUser: store.navReducer.USER.EMAILADDRESS };
};

export default connect(mapStateToProps)(ChangePassword);
