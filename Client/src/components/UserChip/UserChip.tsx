import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { UserChipProps, UserChipState } from './interfaces';

class UserChip extends React.Component<UserChipProps, UserChipState> {
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
