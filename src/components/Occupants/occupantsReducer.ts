import { occupantActions } from './occupantsActions';
import { IOccupantReducer } from './occupantsInterfaces';
import { Action } from 'redux';

function occuapntsReducer(
    state: IOccupantReducer = {
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
    action: IOccupantReducer & Action,
): IOccupantReducer {
    let nextState: IOccupantReducer;
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

// Export Reducer
export default occuapntsReducer;
