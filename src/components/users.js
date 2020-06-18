import React, { useState, useEffect } from "react";
import { isAuthenticated, getUsers } from "../helper";
import { Redirect } from "react-router-dom";

import { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const api = axios.create({
  baseURL: `https://pdgt-covid.herokuapp.com`,
});

function User() {
  var columns = [
    {
      field: 'url',
      title: 'Avatar',
      render: rowData => <img alt='avatar' src='{rowData.url}' style={{width: 50, borderRadius: '50%'}}/>
    },
    { title: "Nome Utente", field: "username" },
    { title: "Password", field: "password" },
  ];

  const [data, setData] = useState([]); //table data
  const [auth, setAuth] = useState(true); //auth state

  //for error and success handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [issuccess, setIssuccess] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);

  useEffect(() => {
    if (isAuthenticated())
      getUsers()
        .then((users) => {
          setData(users);
        })
        .catch((err) => {
          alert("User Not Authenticated");
          setAuth(false);
        });
    else {
      alert("User Not Authenticated");
      setAuth(false);
    }
  }, []);

  const handleRowAdd = (newData, resolve) => {
    // validation
    let errorList = [];
    if (newData.username === undefined) {
      errorList.push("Please enter username");
    }
    if (newData.password === undefined) {
      errorList.push("Please enter password");
    }

    // trim fields
    newData.username = newData.username.trim();
    newData.password = newData.password.trim();

    if (errorList.length < 1) {
      // no error
      api
        .post("/utenti/signup", newData)
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);

          setSuccessMessages([res.data.message]);
          setIssuccess(true);
        })
        .catch((error) => {
          errorList.push(error.response.data.message);
          setErrorMessages(errorList);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    // errors
    let errorList = [];

    api
      .delete("/utenti/" + oldData.username, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("x-access-token"),
        },
        responseType: "json",
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();

        setSuccessMessages([res.data.message]);
        setIssuccess(true);
      })
      .catch((error) => {
        errorList.push(error.response.data.message);
        setErrorMessages(errorList);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div className="Users">
      {auth ? "" : <Redirect to="/" />}
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
            {issuccess && (
              <Alert severity="success">
                {successMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>
          <MaterialTable
            title="Utenti"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default User;

/*
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
*/
