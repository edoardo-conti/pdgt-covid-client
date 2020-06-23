import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class Home extends Component {
  render() {
    return (
      <div class="container">
        <Card>
          <CardContent>
            <div className="landing-div">
              <h1>Benvenuto su <b>pdgt-covid</b></h1>
              <h5 className="textSecondary">developed by Edoardo C.</h5>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Home;
