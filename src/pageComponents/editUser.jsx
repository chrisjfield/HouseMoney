import React, { Component } from "react";

class EditUser extends Component {
  render() {
    return (
      <div className="col-sm-4 col-sm-offset-4 form-main">
        <h2>Edit User</h2>
        <form name="editUserForm" noValidate>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="form-group">
            <label>Surname:</label>
            <input type="text" className="form-control" required />
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

export default EditUser;
