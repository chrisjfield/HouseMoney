import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IStore } from '../../interfaces/storeInterface';
import MessageSnackbarContent from '../MessageSnackbarContent';
import { ErrorMessageActions } from './errorMessageActions';
import { IErrorMessageProps, IErrorMessageState, IErrorMessageStore } from './errorMessageInterfaces';
import errorMessageStyles from './errorMessageStyles';

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
        return (
            <Snackbar
                open={this.state.errorMessageText ? true : false}
                autoHideDuration={4000}
                onClose={this.handleClose}
                className={this.props.classes.errorMessagePrompt}
            >
                <MessageSnackbarContent
                    className={this.props.classes.errorMessagePrompt}
                    onClose={this.handleClose}
                    variant="error"
                    message={this.state.errorMessageText}
                />
            </Snackbar>
        );
    }

    handleClose = () => {
        this.setState({ errorMessageText: null });
        this.props.dispatch(ErrorMessageActions.removeError());
    }

    render() {
        return (
            <div>
                {this.state.errorMessageText ? this.buildErrors() : <div />}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore): IErrorMessageStore => {
    return { errorMessageText: store.errorMessageReducer.errorMessageText };
};

export default compose(withStyles(errorMessageStyles), connect(mapStateToProps))(ErrorMessage);
