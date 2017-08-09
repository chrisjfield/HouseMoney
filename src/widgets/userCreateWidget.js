import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class UserCreateWidget extends Component {
  render() {
    const { handleInputChange, handleAddUser } = this.props;
    //replace true with  when set
    // <FormattedMessage id="createNewUser" />
    //ED! Need to figure out how to add messages to props so the default shit comes through and the label names, register message are lang indep properly.
    return (
      <form
        className="col-sm-4 col-sm-offset-4 form-main"
        onSubmit={handleAddUser}
      >
        <div className="form-content">
          <h2 className="form-title">Register</h2>
          <div className="form-group">
            <label>First Name:</label>
            <input
              name="FIRSTNAME"
              placeholder="First Name"
              className="form-control"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              name="SURNAME"
              placeholder="Last Name"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input
              name="EMAILADDRESS"
              placeholder="email@example.com"
              className="form-control"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              name="PASSWORD"
              type="password"
              placeholder="**********"
              className="form-control"
              required
              onChange={handleInputChange}
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary btn-default"
          />
        </div>
      </form>
    );
  }
}

UserCreateWidget.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleAddUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { USER } = state;

  return {
    USER
  };
}

export default connect(mapStateToProps)(UserCreateWidget);
