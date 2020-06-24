import React, { useState, useEffect, forwardRef } from "react";
import { Redirect } from "react-router-dom";
// helper
import { isAuthenticated, getUsers, api } from "../helper";
// GUI
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
import Alert from "@material-ui/lab/Alert";
// css
import "./users.css"

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

function User() {
  // colonne tabella utenti
  var columns = [
    {
      //editable: 'never',
      field: "avatar_url",
      title: "Avatar",
      render: (rowData) => (
        <img
          alt="avatar"
          src={rowData.avatar_url}
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
    },
    { title: "Nome Utente", field: "username" },
    { title: "Password", field: "password", hidden: true,},
    { title: "Admin", field: "is_admin", type: 'boolean' },
  ];

  // users data
  const [data, setData] = useState([]); //table data
  const [auth, setAuth] = useState(true); //auth state
  // errori
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  // messaggi
  const [issuccess, setIssuccess] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);

  useEffect(() => {
    // disponibile sono se utente autenticato
    if (isAuthenticated())
      getUsers()
        .then((users) => {
          setData(users);
        })
        .catch((err) => {
          alert("Utente non Autenticato!");
          setAuth(false);
        });
    else {
      alert("Utente non Autenticato!");
      setAuth(false);
    }
  }, []);

  const handleRowDelete = (oldData, resolve) => {
    // errori
    let errorList = [];

    // verifico che non si stia tentando di cancellare l'account in uso
    if(oldData.username === localStorage.getItem('login-username')) {
      errorList.push("Impossibile cancellare account in uso.");
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    } else {
      // DELETE /utenti/:byusername
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
          setSuccessMessages([res.data.message]);
          setIssuccess(true);
          resolve();
        })
        .catch((error) => {
          errorList.push(error.response.data.message);
          setErrorMessages(errorList);
          setIserror(true);
          resolve();
        });
    }
  };

  return (
    <div className="Users container">
      {auth ? "" : <Redirect to="/" />}
      <Grid container spacing={1}>
        <Grid item xs={12}>
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
            title="Tabella Utenti"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default User;
