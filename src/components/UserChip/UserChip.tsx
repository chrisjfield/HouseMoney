import Avatar from '@material-ui/core/Avatar/Avatar';
import Chip from '@material-ui/core/Chip/Chip';
import * as React from 'react';
import { IUserChipProps } from './userChipInterfaces';

const UserChip: React.StatelessComponent<IUserChipProps> = (props) => {
    return (
      <Chip key={'Chip_' + props.occupant.occupantId} style={props.styles}>
        <Avatar key={'Avatar_' + props.occupant.occupantId}>
          {props.occupant.displayName ? props.occupant.displayName.charAt(0).toUpperCase() : ''}
        </Avatar>
        {props.occupant.displayName}
      </Chip>
    );
};

export default UserChip;
