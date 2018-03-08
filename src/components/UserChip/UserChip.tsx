import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
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
