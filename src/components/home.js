import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// helper
import { isAuthenticated } from "../helper";

class Home extends Component {
  render() {
    return (
      <div class="container">
        <Card>
          <CardContent>
            <div className="landing-div">
              <h1>
              {isAuthenticated() ? localStorage.getItem("login-username")+", benvenuto" : "Benvenuto" } su <b>pdgt-covid-client</b>
              </h1>
            <div className="repositories">
            <h2>
              <span role="img" aria-label="provetta">
                🧪
              </span>
              <b>pdgt-covid</b>
              <span role="img" aria-label="grafico">
                📊
              </span>
            </h2>
            <hr />
            <a className="first-a" href="https://travis-ci.org/edoardo-conti/pdgt-covid">
              <img
                src="https://travis-ci.org/edoardo-conti/pdgt-covid.svg?branch=master"
                alt="travis-ci"
              />
            </a>
            <a href="https://pdgt-covid.herokuapp.com/">
              <img
                src="https://heroku-badge.herokuapp.com/?app=pdgt-covid"
                alt="heroku"
              />
            </a>
            <a href="https://goreportcard.com/report/github.com/edoardo-conti/pdgt-covid">
              <img
                src="https://goreportcard.com/badge/github.com/edoardo-conti/pdgt-covid"
                alt="goreport"
              />
            </a>
            <a href="https://img.shields.io/github/go-mod/go-version/edoardo-conti/pdgt-covid/master">
              <img
                src="https://img.shields.io/github/go-mod/go-version/edoardo-conti/pdgt-covid/master"
                alt="go-version"
              />
            </a>
            <br />
            <a className="github-link" href="https://github.com/edoardo-conti/pdgt-covid">https://github.com/edoardo-conti/pdgt-covid</a>
            <br /><br />
            <h2>
              <span role="img" aria-label="provetta">
                🧪
              </span>
              <b>pdgt-covid-client</b>
              <span role="img" aria-label="utente al pc">
                👨‍💻
              </span>
            </h2>
            <hr />
            <a className="first-a" href="https://travis-ci.org/edoardo-conti/pdgt-covid-client">
              <img
                src="https://travis-ci.org/edoardo-conti/pdgt-covid-client.svg?branch=master"
                alt="travis-ci"
              />
            </a>
            <a href="https://pdgt-covid-client.herokuapp.com/">
              <img
                src="https://heroku-badge.herokuapp.com/?app=pdgt-covid-client"
                alt="heroku"
              />
            </a>
            <a href="https://img.shields.io/github/package-json/dependency-version/edoardo-conti/pdgt-covid-client/react">
              <img
                src="https://img.shields.io/github/package-json/dependency-version/edoardo-conti/pdgt-covid-client/react"
                alt="npm-react"
              />
            </a>
            <br />
            <a className="github-link" href="https://github.com/edoardo-conti/pdgt-covid-client">https://github.com/edoardo-conti/pdgt-covid-client</a>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Home;
