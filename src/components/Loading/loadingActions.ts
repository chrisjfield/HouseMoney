import { createAction } from '../../helpers/actionCreator';

export enum loadingActionTypes {
    LOADING_STARTED = 'LOADING_STARTED',
    LOADING_COMPLETED = 'LOADING_COMPLETED',
}

export const loadingStarted = () => createAction(loadingActionTypes.LOADING_STARTED);
export const loadingComplete = () => createAction(loadingActionTypes.LOADING_COMPLETED);
