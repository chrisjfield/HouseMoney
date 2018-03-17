import { occupantActions } from './occupantsActions';
import { IReceiveOccupantAction, IOccupantReducer } from './occupantsInterfaces';

function occuapntsReducer(
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
        return { // TODO: Figure out how to type this better ED! 
            ...state,
            loggedInOccupant: action.loggedInOccupant,
            isLoggedIn: action.isLoggedIn,
        };
    default:
        return state;
    }
}

// Export Reducer
export default occuapntsReducer;
