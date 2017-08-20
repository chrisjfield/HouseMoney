import React, { Component } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import apiCall from "../../helpers/apiHelper";

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
    this.createBalance = this.createBalance.bind(this);
  }

  componentWillMount = () => {
    this.getUserData();
  };

  getUserData() {
    const request = apiCall("GET", "TransactionSummaries");

    return request.then(json =>
      this.setState({ balance: json, balanceReturned: true })
    );
  }

  createBalance = balance => {
    const balanceItem = (
      <ListItem
        key={balance.OTHERS}
        primaryText={balance.OTHERS + ": £" + balance.TOTAL.toFixed(2)}
      />
    );
    return balanceItem;
  };

  createBalanceList = () => {
    const balanceList = this.state.balance
      .filter(balanceItem => balanceItem.USER === this.props.loggedInUser)
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
  return { loggedInUser: store.navReducer.USER.EMAILADDRESS };
};

export default connect(mapStateToProps)(Balance);
