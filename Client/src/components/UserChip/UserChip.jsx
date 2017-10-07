import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";

class UserChip extends Component {
  render() {
    const user = this.props.user;
    return (
      <Chip key={"Chip_" + user.email} style={this.props.styles}>
        <Avatar key={"Avatar_" + user.email}>
          {user.email.charAt(0).toUpperCase()}
        </Avatar>
        {user.email}
      </Chip>
    );
  }
}

export default UserChip;
