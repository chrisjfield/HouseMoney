import * as React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { removeError } from './errorMessageActions';
import { ErrorMessageProps, ErrorMessageState } from './interfaces';

class ErrorMessage extends React.Component<ErrorMessageProps, ErrorMessageState> {
    constructor(props: ErrorMessageProps) {
        super(props);
        this.state = {
            errorMessageText: null,
        };
    }

    componentWillReceiveProps(nextProps: ErrorMessageProps) {
        this.setState({ errorMessageText: nextProps.errorMessageText });
    }

    buildErrors = () => {
        const errorMessageText = this.state.errorMessageText;
        const errorMessage = (
                <Snackbar
                    open={errorMessageText !== null}
                    message={errorMessageText}
                    autoHideDuration={4000}
                    onRequestClose={this.handleClose}
                    bodyStyle={{ backgroundColor: appTheme.balance.negativeColor, textAlign: 'center' }}
                />
        );
        return errorMessage;
    }

    handleClose = () => {
        this.setState({ errorMessageText: null });
        this.props.dispatch(removeError());
    }

    render() {
        return (
            <div>
                {this.state.errorMessageText !== null ? this.buildErrors() : <div/>}
            </div>
            );
        }
}

const mapStateToProps = (store: any) => {
    return {
        errorMessageText: store.errorMessageReducer.errorMessageText,
    };
};

export default connect(mapStateToProps)(ErrorMessage);
