import { RECEIVE_USER } from '../Nav/navActions';
import { IUserLoggedIn, IRecieveUserAction } from '../../interfaces/occupantInterfaces';

function navReducer(
  state: IUserLoggedIn = { // TODO: Replace this with occupants reducer which sets logged in occupant
      isLoggedIn: false,
      loggedInOccupant: {
          occupantId: '',
          email: '',
          displayName: '',
      },
  },
  action: IRecieveUserAction,
) {
    switch (action.type) {
    case RECEIVE_USER:
        return {... state, 
            loggedInOccupant: action.payload,
            isLoggedIn: action.isLoggedIn,
        };
    default:
        return state;
    }
}

// Export Reducer
export default navReducer;
