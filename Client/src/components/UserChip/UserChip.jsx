import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";

class UserChip extends Component {
  render() {
    const user = this.props.user;
    return (
      <Chip key={"Chip_" + user.userId} style={this.props.styles}>
        <Avatar key={"Avatar_" + user.userId}>
          {user.displayName ? user.displayName.charAt(0).toUpperCase() : ""}
        </Avatar>
        {user.displayName}
      </Chip>
    );
  }
}

export default UserChip;
