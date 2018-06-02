import Snackbar from 'material-ui/Snackbar';
import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../interfaces/storeInterface';
import { customTheme } from '../../themes';
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
        const errorMessageText = this.state.errorMessageText;
        const errorMessage: JSX.Element = (
                <Snackbar
                    open={errorMessageText !== null}
                    message={errorMessageText}
                    autoHideDuration={4000}
                    onRequestClose={this.handleClose}
                    bodyStyle={{ backgroundColor: customTheme.negativeColor, textAlign: 'center' }}
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
                {this.state.errorMessageText ? this.buildErrors() : <div/>}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    return { errorMessageText: store.errorMessageReducer.errorMessageText };
};

export default connect(mapStateToProps)(ErrorMessage);
