// import { Action } from 'redux';
// import { ofType } from 'redux-observable';
// import { Observable } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { map, mergeMap } from 'rxjs/operators';
// import { ActionWithPayload } from '../../helpers/actionCreator';
// import { IOccupant } from '../Occupants/occupantsInterfaces';
// import { balanceActionTypes, receiveBalance } from './balanceActions';
// import { IBalance } from './balanceInterfaces';

// export const balanceEpic = (actions$: Observable<Action>) =>
//     actions$.pipe(
//         // filter(action => action.type === balanceActionTypes.GET_BALANCE),
//         mergeMap((action: ActionWithPayload<balanceActionTypes.GET_BALANCE, IOccupant>) =>
//             ajax(action.payload.token, action.payload.userId, action.payload.occupantId)
//                 .map( // TODO: Replace this or something???
//                     (x: IBalance[]) => receiveBalance({ balanceArray: x }))),

//         // .map((response: IBalance[]) => receiveBalance({ balanceArray: response }))
//         //      .catch((error: Error) => Observable.pipe(of(ErrorMessageActions.addError(error.message)))),
//     );
