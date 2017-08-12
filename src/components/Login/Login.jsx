import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "./loginActions";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

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
    const styles = {
      container: {
        textAlign: "center",
        "margin-top": "50px"
      }
    };
    return (
      <form style={styles.container} onSubmit={this.handleLogin}>
        <h1>Please Login</h1>
        <div>
          <TextField
            name="EMAILADDRESS"
            type="text"
            placeholder="Email Address"
            className="form-control"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <TextField
            name="PASSWORD"
            type="password"
            placeholder="Password"
            className="form-control"
            autoComplete="current-password"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <FlatButton type="submit" label="Login" />
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
