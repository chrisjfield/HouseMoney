import React, { Component } from "react";
import { connect } from "react-redux";
import { postUser } from "./registerActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FIRSTNAME: "",
      SURNAME: "",
      EMAILADDRESS: "",
      PASSWORD: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  handleAddUser(event) {
    event.preventDefault();
    const { dispatch, history } = this.props,
      USER = this.state;
    dispatch(postUser(USER)).then(history.push("/Payday"));
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
        className="col-sm-4 col-sm-offset-4 form-main"
        onSubmit={this.handleAddUser}
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
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              name="SURNAME"
              placeholder="Last Name"
              className="form-control"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input
              name="EMAILADDRESS"
              placeholder="email@example.com"
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
              required
              onChange={this.handleInputChange}
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

// Retrieve data from store as props
function mapStateToProps(state) {
  const { USER } = state;

  return {
    USER
  };
}

export default connect(mapStateToProps)(Register);
