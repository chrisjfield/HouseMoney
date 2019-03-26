import { WithStyles } from '@material-ui/core';
import { Action, Dispatch } from 'redux';
import { ILoggedInOccupant } from '../Occupants/occupantsInterfaces';
import navStyles from './navStyles';

export interface INavProps extends ILoggedInOccupant, INavMenuProps {
    dispatch: Dispatch<Action>;
    openSidebar: boolean;
}

export interface INavState {
    openSidebar: boolean;
}

export interface INavMenuProps extends WithStyles<typeof navStyles> { }

export interface INavReducer {
    navOpen: boolean;
}
