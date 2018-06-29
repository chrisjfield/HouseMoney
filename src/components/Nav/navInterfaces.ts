import { WithStyles } from '@material-ui/core';
import { Action, Dispatch } from 'redux';
import { ILoggedInOccupant } from '../Occupants/occupantsInterfaces';
import navStyles from './navStyles';

export interface INavProps extends ILoggedInOccupant, INavMenuProps {
    dispatch: Dispatch<Action>;
}

export interface INavState {
    openSidebar: boolean;
}

export interface INavMenuProps extends WithStyles<typeof navStyles> { }
