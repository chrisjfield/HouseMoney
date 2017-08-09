import React, { Component } from "react";

import Nav from "./nav";
import Routes from "./routes";

class App extends Component {
  render() {
    return (
      <div>
        <Routes />
        <Nav />
      </div>
    );
  }
}

export default App;
