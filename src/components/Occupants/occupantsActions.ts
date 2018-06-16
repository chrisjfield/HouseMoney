import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import { ILoggedInOccupant, IOccupant, IOccupantDetails } from './occupantsInterfaces';

export enum occupantActionsTypes {
    LOGGED_OUT = 'LOGGED_OUT',
    RECEIVE_OCCUPANT = 'RECEIVE_OCCUPANT',
    GET_OCCUPANTS_OF_HOUSEHOLD_REQUEST = 'GET_OCCUPANTS_OF_HOUSEHOLD_REQUEST',
    GET_OCCUPANTS_OF_HOUSEHOLD_RESPONSE = 'GET_OCCUPANTS_OF_HOUSEHOLD_RESPONSE',
}

const receiveOccupant = (loggedInOccupant: ILoggedInOccupant) =>
    createAction(occupantActionsTypes.RECEIVE_OCCUPANT, loggedInOccupant);

const getHouseholdOccupants = (occupantDetails: IOccupantDetails) =>
    createAction(occupantActionsTypes.GET_OCCUPANTS_OF_HOUSEHOLD_REQUEST, occupantDetails);

const receiveHouseholdOccupants = (householdOccupantsArray: IOccupant[]) =>
    createAction(occupantActionsTypes.GET_OCCUPANTS_OF_HOUSEHOLD_RESPONSE, householdOccupantsArray);

export const OccupantsActions = {
    receiveOccupant,
    getHouseholdOccupants,
    receiveHouseholdOccupants,
};
export type OccupantsActions = ActionsUnion<typeof OccupantsActions>;
