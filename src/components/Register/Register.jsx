import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";
import ErrorMessage from "../ErrorMessage";
import { registerUser } from "./registerActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FIRSTNAME: "",
      SURNAME: "",
      EMAILADDRESS: "",
      PASSWORD: ""
    };

    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      }
    };
  }

  handleAddUser = event => {
    event.preventDefault();
    const { dispatch, history } = this.props,
      USER = this.state;
    dispatch(registerUser(USER))
      .then(() => history.push("/AddTransaction"))
      .catch(error => {
        this.setState({ error: error });
      });
  };

  handleInputChange = event => {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form style={this.styles.container} onSubmit={this.handleAddUser}>
        <h2>Register</h2>
        <div>
          <TextField
            name="FIRSTNAME"
            hintText="My name"
            floatingLabelText="First Name"
            required
            onChange={this.handleInputChange}
            disabled={this.props.registering}
          />
        </div>
        <div>
          <TextField
            name="SURNAME"
            hintText="My surname"
            floatingLabelText="Last Name"
            onChange={this.handleInputChange}
            disabled={this.props.registering}
          />
        </div>
        <div>
          <TextField
            name="EMAILADDRESS"
            hintText="example@email.com"
            floatingLabelText="Email Address"
            required
            onChange={this.handleInputChange}
            disabled={this.props.registering}
          />
        </div>
        <div>
          <TextField
            name="PASSWORD"
            type="password"
            hintText="**********"
            floatingLabelText="Password"
            required
            onChange={this.handleInputChange}
            disabled={this.props.registering}
          />
        </div>
        <div>
          {this.props.registering
            ? <CircularProgress />
            : <FlatButton type="submit" label="Sign Up" />}
        </div>
        <ErrorMessage />
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  const { USER } = store;

  return {
    USER,
    registering: store.registerReducer.loading,
  };
};

export default connect(mapStateToProps)(Register);
