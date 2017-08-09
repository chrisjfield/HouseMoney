import React, { Component } from "react";
import Checkbox from "./checkbox";

const items = ["One", "Two", "Three"];

class Payday extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, "is selected.");
    }
  };

  createCheckbox = label =>
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />;

  createCheckboxes = () => items.map(this.createCheckbox);

  render() {
    return (
      <div className="col-sm-4 col-sm-offset-4 form-main">
        <h2>Add a Transaction </h2>
        <form name="paydayForm" noValidate>
          <h3> Creditor is . </h3>
          {this.createCheckboxes()}
          <div className="form-group">
            <label>Amount :</label>
            <input
              type="number"
              className="form-control"
              placeholder="0.00"
              required
            />
          </div>
          <div className="form-group">
            <label>Date :</label>
            <input type="date" className="form-control" required />
          </div>
          <div className="form-group">
            <label>Reference :</label>
            <input
              type="text"
              className="form-control"
              placeholder="Reference"
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-default"
            value="Add Transaction"
          />
        </form>
      </div>
    );
  }
}

export default Payday;
