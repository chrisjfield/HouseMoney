import { Dispatch } from 'redux';
import { History } from 'history';

export interface IComponentProps {
    dispatch: Dispatch<Function>;
    history: History;
}
