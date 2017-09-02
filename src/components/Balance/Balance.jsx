import React, { Component } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import CircularProgress from "material-ui/CircularProgress";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
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
      balanceSheet: {
        width: "350px",
        textAlign: "center",
        display: "inline-block"
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
    const debt = math.round(balance.TOTAL, 2),
      debtor = { EMAILADDRESS: balance.OTHERS };
    let colorToSet;

    if (debt < 0) {
      colorToSet = muiTheme.balance.negativeColor;
    } else if (debt > 0) {
      colorToSet = muiTheme.balance.positiveColor;
    } else {
      colorToSet = muiTheme.balance.neutralColor;
    }

    const balanceItem = (
      <div>
        <ListItem
          key={"Debt_" + balance.OTHERS}
          style={{ color: colorToSet, cursor: "auto", width: "auto" }}
          leftAvatar={
            <Avatar
              key={"Avatar_" + debtor.EMAILADDRESS}
              style={{ backgroundColor: colorToSet }}
            >
              {debtor.EMAILADDRESS.charAt(0).toUpperCase()}
            </Avatar>
          }
          primaryText={debtor.EMAILADDRESS + ": £" + math.abs(debt).toFixed(2)}
        />
      </div>
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
          <Paper style={this.styles.balanceSheet}>
            {this.state.balanceReturned
              ? <List>
                  {this.createBalanceList()}
                </List>
              : <CircularProgress />}
          </Paper>
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
