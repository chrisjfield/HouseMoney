import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class UserLoginWidget extends Component {
  render() {
    const { handleInputChange, handleLogin } = this.props;
    return (
      <form
        className="col-lg-4 col-lg-offset-4 form-main"
        onSubmit={handleLogin}
      >
        <h2>Please Login</h2>
        <div className="form-group">
          <label>Email Address:</label>
          <input
            name="EMAILADDRESS"
            type="text"
            placeholder="Enter email address"
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
            autoComplete="current-password"
            required
            onChange={handleInputChange}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-default"
          value="Login"
        />
      </form>
    );
  }
}

UserLoginWidget.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { USER } = state;

  return {
    USER
  };
}

export default connect(mapStateToProps)(UserLoginWidget);
