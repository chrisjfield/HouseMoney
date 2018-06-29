import { WithStyles } from '@material-ui/core/styles';
import { Action, Dispatch } from 'redux';
import errorMessageStyles from './errorMessageStyles';

export interface IErrorMessageProps extends IErrorMessageStore, WithStyles<typeof errorMessageStyles> {
    dispatch: Dispatch<Action>;
}

export interface IErrorMessageState extends IErrorMessageStore { }

export interface IErrorMessageStore extends IErrorMessageReducer { }

export interface IErrorMessageReducer {
    errorMessageText: string;
}
