import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant } from '../../interfaces/occupantsInterfaces';
    
export interface IUserChipProps extends IComponentProps {
    occupant: IOccupant;
    styles: any;
}
