import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IUserObject } from '../../interfaces/userInterfaces';
    
export interface IUserChipProps extends IComponentProps {
    user: IUserObject;
    styles: any;
}

export interface IUserChipState {}
