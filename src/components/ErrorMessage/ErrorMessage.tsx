import Snackbar from '@material-ui/core/Snackbar';
import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../interfaces/storeInterface';
import { removeError } from './errorMessageActions';
import { IErrorMessageProps, IErrorMessageState } from './interfaces';

class ErrorMessage extends React.Component<IErrorMessageProps, IErrorMessageState> {
    constructor(props: IErrorMessageProps) {
        super(props);
        this.state = {
            errorMessageText: null,
        };
    }

    componentWillReceiveProps(nextProps: IErrorMessageProps) {
        this.setState({ errorMessageText: nextProps.errorMessageText });
    }

    buildErrors = () => {
        const errorMessage: JSX.Element = (
                <Snackbar
                    open={this.state.errorMessageText ? true : false}
                    message={<span id="negative-message-id">{this.state.errorMessageText}</span>}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                />
                // TODO: Replace styling on this! 
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
                {this.state.errorMessageText ? this.buildErrors() : <div/>}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    return { errorMessageText: store.errorMessageReducer.errorMessageText };
};

export default connect(mapStateToProps)(ErrorMessage);
