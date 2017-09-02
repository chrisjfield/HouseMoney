import React, { Component } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import CircularProgress from "material-ui/CircularProgress";
import math from "mathjs";
import { muiTheme } from "../../main/themes";
import apiCall from "../../helpers/apiHelper";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "20px"
      },
      balance: {
        textAlign: "left"
      }
    };

    this.state = {
      balance: [],
      balanceReturned: false
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
    const debt = math.round(balance.TOTAL, 2);
    let colorToSet;

    if (debt < 0) {
      colorToSet = muiTheme.balance.negativeColor;
    } else if (debt > 0) {
      colorToSet = muiTheme.balance.positiveColor;
    } else {
      colorToSet = muiTheme.balance.neutralColor;
    }

    const balanceItem = (
      <ListItem
        key={balance.OTHERS}
        style={{ color: colorToSet }}
        primaryText={balance.OTHERS + ": £" + math.abs(debt).toFixed(2)}
      />
    );
    return balanceItem;
  };

  createBalanceList = () => {
    const me = this.props.loggedInUser.EMAILADDRESS,
      balanceList = this.state.balance
        .filter(
          balanceItem => balanceItem.USER === me && balanceItem.OTHERS !== me
        )
        .map(this.createBalance);
    return balanceList;
  };

  render() {
    return (
      <form name="balanceForm" style={this.styles.container}>
        <div>
          <h2>My Balance</h2>
          {this.state.balanceReturned
            ? <List>
                {this.createBalanceList()}
              </List>
            : <CircularProgress />}
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
