import { occupantActions } from './occupantsActions';
import { IReceiveOccupantAction, IOccupantReducer } from './occupantsInterfaces';

function navReducer(
    state: IOccupantReducer = {
        isLoggedIn: false,
        loggedInOccupant: {
            householdId: 0,
            occupantId: 0,
            userId: '',
            email: '',
            displayName: '',
            token: '',
        },
    },
    action: IReceiveOccupantAction,
) {
    switch (action.type) {
    case occupantActions.RECEIVE_OCCUPANT:
        return {
            ...state,
            loggedInOccupant: action.loggedInOccupant,
            isLoggedIn: action.isLoggedIn,
        };
    default:
        return state;
    }
}

// Export Reducer
export default navReducer;
