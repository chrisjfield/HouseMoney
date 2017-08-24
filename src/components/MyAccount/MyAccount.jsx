import React, { Component } from "react";
import update from "react-addons-update";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import Snackbar from "material-ui/Snackbar";
import { editUser, deleteUser } from "./myAccountActions";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userUpdate: {
        CURRENTUSER: this.props.loggedInUser.EMAILADDRESS,
        EMAILADDRESS: this.props.loggedInUser.EMAILADDRESS,
        FIRSTNAME: this.props.loggedInUser.FIRSTNAME,
        SURNAME: this.props.loggedInUser.SURNAME
      },
      userUpdated: false,
      enableEditUser: false,
      deleteUser: false
    };

    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      },
      button: {
        verticalAlign: "middle",
        marginLeft: "25px"
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  handleEditUser(event) {
    event.preventDefault();
    const { dispatch } = this.props,
      USER = this.state.userUpdate;
    dispatch(editUser(USER)).then(this.setState({ userUpdated: true }));
  }

  handleDeleteUser(event) {
    event.preventDefault();
    const { dispatch } = this.props,
      emailAddresss = this.state.userUpdate.EMAILADDRESS;
    dispatch(deleteUser(emailAddresss));
  }

  handleInputChange(event) {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;

    const newState = update(this.state, {
      userUpdate: {
        $merge: { [name]: value }
      }
    });
    this.setState(newState);
  }

  handleEditUserClose = () => {
    this.setState({
      userUpdated: false
    });
  };

  handleDeleteUserOpen = () => {
    this.setState({ deleteUser: true });
  };

  handleDeleteUserClose = event => {
    this.setState({ deleteUser: false });
  };

  render() {
    return (
      <form
        name="MyAccountForm"
        style={this.styles.container}
        onSubmit={this.handleEditUser}
      >
        <h2>Your Details</h2>
        <div>
          <TextField
            name="EMAILADDRESS"
            hintText="email@example.com"
            floatingLabelText="Email Address"
            defaultValue={this.state.userUpdate.CURRENTUSER}
            required
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <TextField
            name="FIRSTNAME"
            hintText="My name"
            floatingLabelText="First Name"
            defaultValue={this.state.userUpdate.FIRSTNAME}
            required
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <TextField
            name="SURNAME"
            hintText="My surname"
            floatingLabelText="Last Name"
            defaultValue={this.state.userUpdate.SURNAME}
            required
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <FlatButton type="submit" label="Update" />
          <FlatButton
            style={this.styles.button}
            label=" Change Password "
            onClick={() => this.props.history.push("/ChangePassword")}
          />
          <FlatButton
            style={this.styles.button}
            label=" Delete "
            onClick={this.handleDeleteUserOpen}
          />
        </div>
        <Snackbar
          open={this.state.userUpdated}
          message="Details updated"
          autoHideDuration={4000}
          onRequestClose={this.handleEditUserClose}
        />
        <Dialog
          title="Delete User"
          actions={[
            <FlatButton
              label="No"
              primary={true}
              onClick={this.handleDeleteUserClose}
            />,
            <FlatButton
              label="Yes"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleDeleteUser}
            />
          ]}
          modal={false}
          open={this.state.deleteUser}
          onRequestClose={this.handleDeleteUserClose}
        >
          Are you sure you want to delete your account?
        </Dialog>
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(MyAccount);
