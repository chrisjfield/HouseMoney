import React, { Component } from "react";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      }
    };
  }
  generateButton(Path, buttonText) {
    return (
      <button
        type="button"
        className="btn btn-primary btn-default"
        onClick={() => this.props.history.push(Path)}
      >
        {buttonText}
      </button>
    );
  }

  render() {
    /* Need to rewrite this html Ed!*/
    return (
      <div
        className="col-sm-4 col-sm-offset-4 form-main"
        style={this.styles.container}
      >
        <h2>Your Details</h2>
        <h3>Email Address: </h3>
        <h3>First Name: </h3>
        <h3>Last Name: </h3>
        <form name="MyAccountForm" style={this.styles.container}>
          {this.generateButton("/EditUser", "Edit Details")}
          {this.generateButton("/ChangePassword", "Change Password")}
          {this.generateButton("/Login", "Delete User")}
        </form>
      </div>
    );
  }
}

export default MyAccount;
