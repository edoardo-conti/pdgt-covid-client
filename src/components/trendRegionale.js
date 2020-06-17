import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

class TrendRegionale extends Component {
  constructor() {
    super();
    this.state = { trendRegionali: [] };
  }

  componentDidMount() {
    // todo
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Andamento Regionale</h3>
        <hr />
      </div>
    );
  }

}

export default TrendRegionale;
