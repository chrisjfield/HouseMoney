import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "./loginActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EMAILADDRESS: "",
      PASSWORD: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const { dispatch, history } = this.props,
      LOGIN = this.state;
    dispatch(loginUser(LOGIN)).then(() => history.push("/Balance"));
  }

  handleInputChange(event) {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form
        className="col-lg-4 col-lg-offset-4 form-main"
        onSubmit={this.handleLogin}
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
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
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

// Retrieve data from store as props
function mapStateToProps(state) {
  const { USER } = state;

  return {
    USER
  };
}

export default connect(mapStateToProps)(Login);
