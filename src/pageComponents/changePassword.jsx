import React, { Component } from "react";

class changePassword extends Component {
  render() {
    return (
      <div className="col-sm-4 col-sm-offset-4 form-main">
        <h2>Change Password</h2>
        <form name="changePasswordForm">
          <div className="form-group">
            <label>Current Password:</label>
            <input type="password" className="form-control" required />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input type="password" required />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input type="password" required />
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-default"
            value="Confirm"
          />
        </form>
      </div>
    );
  }
}

export default changePassword;
