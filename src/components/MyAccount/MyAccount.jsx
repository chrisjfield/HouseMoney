import React, { Component } from "react";
import { connect } from "react-redux";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";
import apiCall from "../../helpers/apiHelper";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      userDetailsReturned: false
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
  }

  componentWillMount = () => {
    this.getUserDetails();
  };

  getUserDetails() {
    const emailAddress = this.props.loggedInUser,
      password = "u1", //ED! need to change the API here
      request = apiCall(
        "GET",
        "Users/GetSingleUser",
        null,
        "emailAddress=" + emailAddress + "&password=" + password
      );

    return request.then(json =>
      this.setState({ userDetails: json, userDetailsReturned: true })
    );
  }

  generateButton(Path, buttonText) {
    return (
      <FlatButton
        style={this.styles.button}
        onClick={() => this.props.history.push(Path)}
      >
        {buttonText}
      </FlatButton>
    );
  }

  createUserDetails = () => {
    const userDetails = this.state.userDetails,
      userDetailsForm = (
        <List>
          <ListItem
            key={userDetails.EMAILADDRESS}
            primaryText={"Email Address : " + userDetails.EMAILADDRESS}
          />
          <ListItem
            key={userDetails.FIRSTNAME}
            primaryText={"First Name : " + userDetails.FIRSTNAME}
          />
          <ListItem
            key={userDetails.SURNAME}
            primaryText={"Last Name : " + userDetails.SURNAME}
          />
        </List>
      );
    return userDetailsForm;
  };

  createUserDetailsNotFound = () => {
    const notFound = <div>User Details not found</div>;
    return notFound;
  };

  render() {
    return (
      <form name="MyAccountForm" style={this.styles.container}>
        <h1>Your Details</h1>
        <div>
          {this.state.userDetailsReturned
            ? this.createUserDetails()
            : this.createUserDetailsNotFound()}
        </div>
        <div>
          {this.generateButton("/EditUser", " Edit Details ")}
          {this.generateButton("/ChangePassword", " Change Password ")}
          {this.generateButton("/Login", " Delete User ")}
        </div>
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return { loggedInUser: store.navReducer.USER.EMAILADDRESS };
};

export default connect(mapStateToProps)(MyAccount);
