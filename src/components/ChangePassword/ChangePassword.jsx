import React, { Component } from "react";
import update from "react-addons-update";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import apiCall from "../../helpers/apiHelper";
import { addError } from "../ErrorMessage/errorMessageActions";

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
      passwordUpdating: false,
      passwordUpdated: false
    };
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      }
    };
  }

  componentWillMount() {
    this.setState({
      passwordUpdate: { EMAILADDRESS: this.props.loggedInUser.EMAILADDRESS }
    });
  }

  handlePasswordChange = event => {
    event.preventDefault();
    this.setState({ passwordUpdating: true });
    const updatePassword = this.state.passwordUpdate,
      request = apiCall("PUT", "Users/UpdateUserPassword", updatePassword);

    return request
      .then(json => {
        this.setState({
          passwordUpdating: false,
          passwordUpdated: true,
          passwordUpdate: {
            CURRENTPASSWORD: "",
            NEWPASSWORD: "",
            NEWPASSWORDCONFIRM: ""
          }
        });
      })
      .catch(error => {
        this.setState({ passwordUpdating: false });
        this.props.dispatch(addError(error.message));
      });
  };

  handleInputChange = event => {
    const target = event.target,
      value = target.value,
      name = target.name;

    const newState = update(this.state, {
      passwordUpdate: {
        $merge: { [name]: value }
      }
    });
    this.setState(newState);
  };

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
            value={this.state.passwordUpdate.CURRENTPASSWORD}
            onChange={this.handleInputChange}
            disabled={this.state.passwordUpdating}
          />
        </div>
        <div>
          <TextField
            name="NEWPASSWORD"
            type="password"
            hintText="************"
            floatingLabelText="New Password"
            required
            value={this.state.passwordUpdate.NEWPASSWORD}
            onChange={this.handleInputChange}
            disabled={this.state.passwordUpdating}
          />
        </div>
        <div>
          <TextField
            name="NEWPASSWORDCONFIRM"
            type="password"
            hintText="************"
            floatingLabelText="Confirm Password"
            required
            value={this.state.passwordUpdate.NEWPASSWORDCONFIRM}
            onChange={this.handleInputChange}
            disabled={this.state.passwordUpdating}
          />
        </div>
        <FlatButton
          type="submit"
          label="Update"
          disabled={this.state.passwordUpdating}
        />
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
  return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(ChangePassword);
