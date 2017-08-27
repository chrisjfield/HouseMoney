import React, { Component } from "react";
import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";
import { muiTheme } from "../../main/themes";

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: { response: { ok: true, statusText: "" } }
    };
  }

  componentWillReceiveProps() {
    this.setState({ error: this.props.error });
  }

  buildErrors = () => {
    const error = this.state.error,
      errorMessage = (
        <Snackbar
          open={!error.response.ok}
          message={error.response.statusText}
          autoHideDuration={4000}
          onRequestClose={this.handleClose}
          bodyStyle={{ backgroundColor: muiTheme.balance.negativeColor }}
        />
      );
    return errorMessage;
  };

  handleClose = () => {
    this.setState({ error: { response: { ok: true, statusText: "" } } });
  };

  render() {
    return (
      <div>
        {!this.props.error.response.ok ? this.buildErrors() : undefined}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    error: store.errorMessageReducer.errors
  };
};

export default connect(mapStateToProps)(ErrorMessage);
