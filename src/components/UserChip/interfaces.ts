import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant } from '../Occupants/occupantsInterfaces';
    
export interface IUserChipProps extends IComponentProps {
    occupant: IOccupant;
    styles: any; // TODO : NO any! 
}
