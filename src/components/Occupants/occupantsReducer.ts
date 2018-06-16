import { occupantActionsTypes, OccupantsActions } from './occupantsActions';
import { IOccupantReducer } from './occupantsInterfaces';

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
    action: OccupantsActions,
) {
    let nextState: IOccupantReducer;
    switch (action.type) {
    case occupantActionsTypes.RECEIVE_OCCUPANT:
        nextState = {
            ...state,
            isLoggedIn: action.payload.isLoggedIn,
            loggedInOccupant: action.payload.loggedInOccupant,
        };
        break;
    case occupantActionsTypes.GET_OCCUPANTS_OF_HOUSEHOLD_RESPONSE:
        nextState = {
            ...state,
            householdOccupantsArray: action.payload,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default occuapntsReducer;
