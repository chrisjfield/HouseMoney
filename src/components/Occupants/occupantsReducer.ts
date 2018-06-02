import { Action } from 'redux';
import { occupantActions } from './occupantsActions';
import { IOccupantStore } from './occupantsInterfaces';

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
    action: IOccupantStore & Action,
): IOccupantStore {
    let nextState: IOccupantStore;
    switch (action.type) {
    case occupantActions.RECEIVE_OCCUPANT:
        nextState = {
            ...state,
            loggedInOccupant: action.loggedInOccupant,
            isLoggedIn: action.isLoggedIn,
        };
        break;
    case occupantActions.RECEIVE_OCCUPANTS_OF_HOUSEHOLD:
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
