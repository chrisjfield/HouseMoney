import React, { Component } from "react";
import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";
import { muiTheme } from "../../main/themes";
import { removeError } from "./errorMessageActions";

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessageText: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errorMessageText: nextProps.errorMessageText });
  }

  buildErrors = () => {
    const errorMessageText = this.state.errorMessageText,
      errorMessage = (
        <Snackbar
          open={errorMessageText !== null}
          message={errorMessageText}
          autoHideDuration={4000}
          onRequestClose={this.handleClose}
          bodyStyle={{ backgroundColor: muiTheme.balance.negativeColor, textAlign: "center" }}
        />
      );
    return errorMessage;
  };

  handleClose = () => {
    this.setState({ errorMessageText: null });
    this.props.dispatch(removeError());
  };

  render() {
    return (
      <div>
        {this.state.errorMessageText !== null ? this.buildErrors() : undefined}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    errorMessageText: store.errorMessageReducer.errorMessageText
  };
};

export default connect(mapStateToProps)(ErrorMessage);
