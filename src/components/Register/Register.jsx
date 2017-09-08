import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";
import { registerUser } from "./registerActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FIRSTNAME: "",
      SURNAME: "",
      EMAILADDRESS: "",
      PASSWORD: "",
      loading: false,
      error: null
    };

    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "20px"
      }
    };
  }

  handleAddUser = event => {
    event.preventDefault();
    const { dispatch, history } = this.props,
      USER = {
        FIRSTNAME: this.state.FIRSTNAME,
        SURNAME: this.state.SURNAME,
        EMAILADDRESS: this.state.EMAILADDRESS,
        PASSWORD: this.state.PASSWORD
      };
    this.setState({ loading: true });
    dispatch(registerUser(USER))
      .then(() => {
        this.setState({ loading: false });
        history.push("/AddTransaction");
      })
      .catch(error => {
        this.setState({ error: error, loading: false });
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
            disabled={this.state.loading}
          />
        </div>
        <div>
          <TextField
            name="SURNAME"
            hintText="My surname"
            floatingLabelText="Last Name"
            onChange={this.handleInputChange}
            disabled={this.state.loading}
          />
        </div>
        <div>
          <TextField
            name="EMAILADDRESS"
            hintText="example@email.com"
            floatingLabelText="Email Address"
            required
            onChange={this.handleInputChange}
            disabled={this.state.loading}
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
            disabled={this.state.loading}
          />
        </div>
        <div>
          {this.state.loading
            ? <CircularProgress />
            : <FlatButton type="submit" label="Sign Up" />}
        </div>
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  const { USER } = store;

  return {
    USER,
    registering: store.registerReducer.loading
  };
};

export default connect(mapStateToProps)(Register);
