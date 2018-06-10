import { IOccupantStore } from './occupantsInterfaces';
import { ActionWithPayload } from '../../helpers/actionCreator';
import { occupantActionsTypes } from './occupantsActions';

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
    action: ActionWithPayload<occupantActionsTypes, IOccupantStore>,
) {
    let nextState: IOccupantStore;
    switch (action.type) {
    case occupantActionsTypes.RECEIVE_OCCUPANT:
        nextState = {
            ...state,
            isLoggedIn: action.payload.isLoggedIn,
            loggedInOccupant: action.payload.loggedInOccupant,
        };
        break;
    case occupantActionsTypes.RECEIVE_OCCUPANTS_OF_HOUSEHOLD:
        nextState = {
            ...state,
            householdOccupantsArray: action.payload.householdOccupantsArray,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default occuapntsReducer;
