
import { logout } from '../components/Occupants/occupantsActions';
import history from '../main/history';
import store from '../main/store';
import { myHouseUrl } from '../appConfig';

export function handleLogOut() {
    store.dispatch(logout())
        .then(() => history.push(myHouseUrl))
        .catch((error: Error) => { });
}
