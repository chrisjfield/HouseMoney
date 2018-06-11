import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionWithPayload } from '../../helpers/actionCreator';
import ajaxCall from '../../helpers/ajaxHelper';
import { ajaxCallParams } from '../../interfaces/apiInterfaces';
import { IOccupantDetails } from '../Occupants/occupantsInterfaces';
import { balanceActionTypes, receiveBalance } from './balanceActions';
import { IBalance } from './balanceInterfaces';

const balanceRequestEpic = (action$: Observable<ActionWithPayload<balanceActionTypes.GET_BALANCE_REQUEST, IOccupantDetails>>) => {
    return action$.pipe(
        ofType(balanceActionTypes.GET_BALANCE_REQUEST),
        mergeMap((params) => {
            const balanceAjaxParams: ajaxCallParams = {
                token: params.payload.token,
                method: HTTPMethod.GET,
                endpoint: endpoints.balance,
                urlParams: params.payload.userId + ',' + params.payload.occupantId.toString(),
            };
            return ajaxCall<IBalance[]>(balanceAjaxParams).pipe(
                map(response => of(
                    receiveBalance(response),
                )),
            );
        },
        ),
    );
};

export default balanceRequestEpic;
