import React, { Component } from "react";
import update from "react-addons-update";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import { editUser } from "./editUserActions";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userUpdate: {
        CURRENTUSER: "",
        EMAILADDRESS: "",
        FIRSTNAME: "",
        SURNAME: ""
      },
      userUpdated: false
    };
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
  }

  componentWillMount() {
    this.setState({
      userUpdate: this.props.loggedInUser
    });
    const newState = update(this.state, {
      userUpdate: {
        $set: {
          CURRENTUSER: this.props.loggedInUser.EMAILADDRESS,
          EMAILADDRESS: this.props.loggedInUser.EMAILADDRESS,
          FIRSTNAME: this.props.loggedInUser.FIRSTNAME,
          SURNAME: this.props.loggedInUser.SURNAME
        }
      }
    });
    this.setState(newState);
  }

  handleEditUser(event) {
    event.preventDefault();
    const { dispatch } = this.props,
      USER = this.state.userUpdate;
    dispatch(editUser(USER)).then(this.setState({ userUpdated: true }));
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

  handleRequestClose = () => {
    this.setState({
      userUpdated: false
    });
  };

  render() {
    return (
      <form onSubmit={this.handleEditUser} style={this.styles.container}>
        <h2>Edit User</h2>
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
        <FlatButton type="submit" label="Update" />
        <Snackbar
          open={this.state.userUpdated}
          message="Details updated"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return {
    loggedInUser: store.navReducer.USER
  };
};

export default connect(mapStateToProps)(EditUser);
