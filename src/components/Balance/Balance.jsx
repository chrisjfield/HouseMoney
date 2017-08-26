import React, { Component } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import apiCall from "../../helpers/apiHelper";
import math from "mathjs";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      },
      balance: {
        textAlign: "left"
      }
    };

    this.state = {
      balance: [],
      balanceReturned: true
    };
  }

  componentWillMount = () => {
    this.getUserData();
  };

  getUserData = () => {
    const request = apiCall("GET", "TransactionSummaries");

    return request.then(json =>
      this.setState({ balance: json, balanceReturned: true })
    );
  };

  createBalance = balance => {
    const balanceItem = (
      <ListItem
        key={balance.OTHERS}
        primaryText={
          balance.OTHERS + ": £" + math.round(balance.TOTAL, 2).toFixed(2)
        }
      />
    );
    return balanceItem;
  };

  createBalanceList = () => {
    const balanceList = this.state.balance
      .filter(
        balanceItem => balanceItem.USER === this.props.loggedInUser.EMAILADDRESS
      )
      .map(this.createBalance);
    return balanceList;
  };

  render() {
    return (
      <form name="balanceForm" style={this.styles.container}>
        <div>
          <h2>My Balance</h2>
          <List>
            {this.createBalanceList()}
          </List>
        </div>
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(Balance);
