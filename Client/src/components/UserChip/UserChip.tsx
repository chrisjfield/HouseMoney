import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { IUserChipProps, IUserChipState } from './interfaces';

class UserChip extends React.Component<IUserChipProps, IUserChipState> {
    render() {
        const user = this.props.user;
        return (
          <Chip key={'Chip_' + user.userId} style={this.props.styles}>
            <Avatar key={'Avatar_' + user.userId}>
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : ''}
            </Avatar>
            {user.displayName}
          </Chip>
        );
    }
}

export default UserChip;
