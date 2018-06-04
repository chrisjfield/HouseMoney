import { Action } from 'redux';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ActionWithPayload } from '../../helpers/actionCreator';
import { IOccupant } from '../Occupants/occupantsInterfaces';
import { balanceActionTypes, getBalanceRequest, receiveBalance } from './balanceActions';

export const balanceEpic = (actions$: Observable<Action>) =>
    actions$.pipe(
        // filter(action => action.type === balanceActionTypes.GET_BALANCE),
        mergeMap((action: ActionWithPayload<balanceActionTypes.GET_BALANCE, IOccupant>) =>
            getBalanceRequest(action.payload.token, action.payload.userId, action.payload.occupantId)
            .then( // TODO: Replace this or something???
                x => receiveBalance({ balanceArray: x }))),

        // .map((response: IBalance[]) => receiveBalance({ balanceArray: response }))
        //      .catch((error: Error) => Observable.pipe(of(ErrorMessageActions.addError(error.message)))),
        );
