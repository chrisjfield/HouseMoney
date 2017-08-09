import React, { Component } from "react";

class myHistory extends Component {
  render() {
    return (
      <form name="historyForm" noValidate>
        <div id="balance" className="container leftrightjustify">
          <h1>My Transactions</h1>
        </div>
        <div id="historyTable">
          <table className="table">
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

export default myHistory;
