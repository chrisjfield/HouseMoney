import { ActionsUnion, createAction } from '../../helpers/actionCreator';

export enum loadingActionTypes {
    LOADING_STARTED = 'LOADING_STARTED',
    LOADING_COMPLETED = 'LOADING_COMPLETED',
}

const loadingStarted = () => createAction(loadingActionTypes.LOADING_STARTED);
const loadingComplete = () => createAction(loadingActionTypes.LOADING_COMPLETED);

export const LoadingActions = {
    loadingStarted,
    loadingComplete,
};

export type LoadingActions = ActionsUnion<typeof LoadingActions>;
