import React, { Component } from "react";
import { signup } from "../helper";
// GUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// css
import "./login-signup.css";

class Signup extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "", is_admin: false };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  submitSignup(event) {
    event.preventDefault();

    signup(this.state)
      .then((res) => {
        var messagge = res.message;

        alert(messagge + " Ora è possibile eseguire l'accesso!");
        window.location = "/signin";
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="signup-div">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrati su <b>pdgt-covid</b>
          </Typography>
          <form onSubmit={this.submitSignup}>
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
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="is_admin"
                  //inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Cliccare per registrare utente come admin"
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Registrati
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
export default Signup;
