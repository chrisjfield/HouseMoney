import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import * as React from 'react';
import { IUserChipProps } from './interfaces';

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
