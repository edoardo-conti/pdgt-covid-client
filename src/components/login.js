import React, { Component } from "react";
import { login } from "../helper";
// GUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
// css
import "./login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }  

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitLogin(event) {
    event.preventDefault();
    login(this.state)
      .then((token) => (window.location = "/"))
      .catch((err) => alert(err));
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="login-div">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Accedi a <b>pdgt-covid</b>
          </Typography>
          <form onSubmit={this.submitLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={this.handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Accedi
            </Button>
          </form>
        </div>
      </Container>
    );
    /*
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3>Login</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submitLogin}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-default">
                  Accedi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    */
  }
}
export default Login;
