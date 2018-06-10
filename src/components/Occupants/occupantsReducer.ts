import { IOccupantStore, OccupantsActions } from './occupantsInterfaces';
import { getType } from 'typesafe-actions';
import * as occupantsActions from './occupantsActions';

function occuapntsReducer(
    state: IOccupantStore = {
        isLoggedIn: false,
        loggedInOccupant: {
            occupantId: 0,
            userId: '',
            email: '',
            displayName: '',
            token: '',
        },
        householdOccupantsArray: [],
    },
    action: OccupantsActions,
) {
    let nextState;
    switch (action.type) {
    case getType(occupantsActions.receiveOccupant):
        nextState = {
            ...state,
            isLoggedIn: action.payload.isLoggedIn,
            loggedInOccupant: action.payload.loggedInOccupant,
        };
        break;
    case occupantActionsTypes.RECEIVE_OCCUPANTS_OF_HOUSEHOLD:
        nextState = {
            ...state,
            householdOccupantsArray: action.householdOccupantsArray,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

// Export Store
export default occuapntsReducer;
