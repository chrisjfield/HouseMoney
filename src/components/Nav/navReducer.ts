import { RECEIVE_USER } from '../Nav/navActions';
import { IUserLoggedIn, IRecieveUserAction } from '../../interfaces/userInterfaces';

function navReducer(
  state: IUserLoggedIn = { //TODO: Replace this with occupants reducer which sets logged in occupant
      isLoggedIn: false,
      loggedInUser: {
          userId: '',
          email: '',
          displayName: '',
      },
  },
  action: IRecieveUserAction,
) {
    switch (action.type) {
    case RECEIVE_USER:
        return {... state, 
            loggedInUser: action.payload,
            isLoggedIn: action.isLoggedIn,
        };
    default:
        return state;
    }
}

// Export Reducer
export default navReducer;
