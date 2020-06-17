import React, { Component } from "react";
import { isAuthenticated, getUsers } from "../helper";
import { Redirect } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = { users: [], auth: true };
  }

  componentDidMount() {
    if (isAuthenticated())
      getUsers()
        .then((users) => {
          this.setState({ users });
        })
        .catch((err) => {
          alert("User Not Authenticated");
          this.setState({ auth: false });
        });
    else {
      alert("User Not Authenticated");
      this.setState({ auth: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.auth ? "" : <Redirect to="/" />}
        <h3 className="text-center">Lista Utenti</h3>
        <hr />
        {this.state.users.map((user) => (
          <div className="col-sm-10 col-sm-offset-1" key={user.username}>
            <div className="panel panel-success">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <span className="btn">{user.username}</span>
                </h3>
              </div>
              <div className="panel-body">
                <p> {user.password} </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Users;
