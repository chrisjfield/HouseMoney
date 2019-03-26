import { ActionsUnion, createAction } from '../../helpers/actionCreator';

export enum navActionTypes {
    NAV_OPEN = 'NAV_OPEN',
    NAV_CLOSED = 'NAV_CLOSED',
}

const navOpened = () => createAction(navActionTypes.NAV_OPEN);
const navClosed = () => createAction(navActionTypes.NAV_CLOSED);

export const NavActions = {
    navOpened,
    navClosed,
};

export type NavActions = ActionsUnion<typeof NavActions>;
