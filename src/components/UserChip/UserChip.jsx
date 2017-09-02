import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";

class UserChip extends Component {
  render() {
    const user = this.props.user;
    return (
      <Chip key={"Chip_" + user.EMAILADDRESS} style={this.props.styles}>
        <Avatar key={"Avatar_" + user.EMAILADDRESS}>
          {user.EMAILADDRESS.charAt(0).toUpperCase()}
        </Avatar>
        {user.EMAILADDRESS}
      </Chip>
    );
  }
}

export default UserChip;
