import React, { Component } from "react";
import apiCall from "../../helpers/apiHelper";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      }
    };

    this.state = {
      balance: {}
    };
  }

  componentWillMount = () => {
    this.getUserData();
  };

  getUserData() {
    const request = apiCall("GET", "Users/TransactionSummaries");

    return request.then(json => this.setState({ balance: json }));
  }
  //ED! Can use the map stuff from HouseSummary to create the credits and debts here

  createBalance = () => this.state.userData.map(this.createRow);
  render() {
    return (
      <form name="balanceForm" style={this.styles.container}>
        <div id="balance" className="container leftrightjustify">
          <h1>My Balance</h1>
          <h3> Debts: </h3>
          <h3> Credits: </h3>
        </div>
      </form>
    );
  }
}

export default Balance;
