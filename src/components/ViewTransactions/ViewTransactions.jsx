import React, { Component } from "react";

class ViewTransactions extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      }
    };
  }
  render() {
    return (
      <form name="ViewTransactionsForm" style={this.styles.container}>
        <div id="balance" className="container leftrightjustify">
          <h1>My Transactions</h1>
        </div>
        <div id="ViewTransactionsTable" style={this.styles.container}>
          <table className="table" style={this.styles.container}>
            <thead className="table-header">
              <tr className="sublist-header">
                <td>OTHERS</td>
                <td>GROSS</td>
                <td>REFERENCE</td>
                <td>DATE</td>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td>
                  <div className="pagination pull-right">
                    <button
                      type="button"
                      className="btn btn-primary btn-default"
                    >
                      « Prev
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-default"
                    >
                      Next »
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>
              <tr className="sublist-row">
                <td>OTHERS</td>
                <td>AMOUNT</td>
                <td>REFERENCE</td>
                <td>DATE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    );
  }
}

export default ViewTransactions;
