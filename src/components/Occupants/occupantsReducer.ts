import { occupantActions } from './occupantsActions';
import { IOccupantLoggedIn, IReceiveOccupantAction } from './occupantsInterfaces';

function navReducer(
    state: IOccupantLoggedIn = {
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
        const receivedOccupant: IOccupantLoggedIn = {
            loggedInOccupant: action.loggedInOccupant,
            isLoggedIn: action.isLoggedIn,
        };
        return {
            ...state,
            receivedOccupant,
        };
    default:
        return state;
    }
}

// Export Reducer
export default navReducer;