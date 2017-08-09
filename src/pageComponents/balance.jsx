import React, { Component } from "react";

class Balance extends Component {
  render() {
    return (
      <form name="balanceForm">
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
