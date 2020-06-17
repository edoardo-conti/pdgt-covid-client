import React, { useState, useEffect } from "react";
import "./trendNazionale.css";
import { forwardRef } from "react";
// import Grid from '@material-ui/core/Grid'

import { isAuthenticated } from "../helper";

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

function validateDate(input) {
  // check
  var regEx = /^\d{4}-\d{2}-\d{2}$/;

  return input.match(regEx)
}

function TrendNazionale() {
  //table auth
  const [auth, setAuth] = useState([]);

  var columns = [
    { title: "data", field: "data" , editable: 'onAdd'},
    { title: "stato", field: "stato", hidden: true },
    { title: "ricoverati_con_sintomi", field: "ricoverati_con_sintomi" },
    { title: "terapia_intensiva", field: "terapia_intensiva" },
    { title: "totale_ospedalizzati", field: "totale_ospedalizzati" },
    { title: "isolamento_domiciliare", field: "isolamento_domiciliare" },
    { title: "totale_positivi", field: "totale_positivi" },
    { title: "variazione_totale_positivi", field: "variazione_totale_positivi" },
    { title: "nuovi_positivi", field: "nuovi_positivi" },
    { title: "dimessi_guariti", field: "dimessi_guariti" },
    { title: "deceduti", field: "deceduti" },
    { title: "totale_casi", field: "totale_casi" },
    { title: "tamponi", field: "tamponi" },
    { title: "casi_testati", field: "casi_testati.Int64" }
  ];

  //table data
  const [data, setData] = useState([]);

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  
  const [issuccess, setIssuccess] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);

  useEffect(() => {
    // controllo se l'utente è loggato 
    if (isAuthenticated()) setAuth(true);
    else {
      setAuth(false);
    }

    api
      .get("/andamento/nazionale", {
        responseType: "json",
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    /*
    if (newData.ricoverati_con_sintomi === "") {
      errorList.push("compilare il campo ricoverati_con_sintomi");
    }
    if (newData.terapia_intensiva === "") {
      errorList.push("compilare il campo terapia_intensiva");
    }
    if (newData.totale_ospedalizzati === "" || validateField(newData.totale_ospedalizzati) === false) {
      errorList.push("compilare il campo totale_ospedalizzati correttamente");
    }
    */

    if (errorList.length < 1) {
      // PATCH request
      api
        .patch("/andamento/nazionale/data/" + newData.data, {
          "ricoverati_con_sintomi": parseInt(newData.ricoverati_con_sintomi),
          "terapia_intensiva": parseInt(newData.terapia_intensiva),
          "totale_ospedalizzati": parseInt(newData.totale_ospedalizzati),
          "isolamento_domiciliare": parseInt(newData.isolamento_domiciliare),
          "totale_positivi": parseInt(newData.totale_positivi),
          "variazione_totale_positivi": parseInt(newData.variazione_totale_positivi),
          "nuovi_positivi": parseInt(newData.nuovi_positivi),
          "dimessi_guariti": parseInt(newData.dimessi_guariti),
          "deceduti": parseInt(newData.deceduti),
          "totale_casi": parseInt(newData.totale_casi),
          "tamponi": parseInt(newData.tamponi),
          "casi_testati": parseInt(newData.casi_testati.Int64)
        })
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();

          setIserror(false);
          setErrorMessages([]);

          // success
          setSuccessMessages([res.data.message])
          setIssuccess(true); 
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
        
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }

  };

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if(newData.data === undefined || !validateDate(newData.data)) {
      errorList.push("Perfavore inserisci una data con formato corretto");
    }
    if (newData.ricoverati_con_sintomi === undefined) {
      errorList.push("Please enter ricoverati_con_sintomi");
    }
    if (newData.terapia_intensiva === undefined) {
      errorList.push("Please enter terapia_intensiva");
    }
    if (newData.totale_ospedalizzati === undefined) {
      errorList.push("Please enter totale_ospedalizzati");
    }
    if (newData.isolamento_domiciliare === undefined) {
      errorList.push("Please enter isolamento_domiciliare");
    }
    if (newData.totale_positivi === undefined) {
      errorList.push("Please enter totale_positivi");
    }
    if (newData.variazione_totale_positivi === undefined) {
      errorList.push("Please enter variazione_totale_positivi");
    }
    if (newData.nuovi_positivi === undefined) {
      errorList.push("Please enter nuovi_positivi");
    }
    if (newData.dimessi_guariti === undefined) {
      errorList.push("Please enter dimessi_guariti");
    }
    if (newData.deceduti === undefined) {
      errorList.push("Please enter deceduti");
    }
    if (newData.totale_casi === undefined) {
      errorList.push("Please enter totale_casi");
    }
    if (newData.tamponi === undefined) {
      errorList.push("Please enter tamponi");
    }
    if (newData.casi_testati === undefined) {
      errorList.push("Please enter casi_testati");
    }

    // fix bug casi_testati
    // var memcs = newData.casi_testati;
    // newData.casi_testati = newData.casi_testati.Int64;

    // parseInt dei campi
    /*
    newData.ricoverati_con_sintomi = parseInt(newData.ricoverati_con_sintomi);
    newData.terapia_intensiva = parseInt(newData.terapia_intensiva);
    newData.totale_ospedalizzati = parseInt(newData.totale_ospedalizzati);
    newData.isolamento_domiciliare = parseInt(newData.isolamento_domiciliare);
    newData.totale_positivi = parseInt(newData.totale_positivi);
    newData.variazione_totale_positivi = parseInt(newData.variazione_totale_positivi);
    newData.nuovi_positivi = parseInt(newData.nuovi_positivi);
    newData.dimessi_guariti = parseInt(newData.dimessi_guariti);
    newData.deceduti = parseInt(newData.deceduti);
    newData.totale_casi = parseInt(newData.totale_casi);
    newData.tamponi = parseInt(newData.tamponi);
    newData.casi_testati = parseInt(newData.casi_testati);
    */

    if (errorList.length < 1) {
      //no error
      api
        //.post("/andamento/nazionale", newData)
        .post("/andamento/nazionale", {
          "data": newData.data,
          "ricoverati_con_sintomi": parseInt(newData.ricoverati_con_sintomi),
          "terapia_intensiva": parseInt(newData.terapia_intensiva),
          "totale_ospedalizzati": parseInt(newData.totale_ospedalizzati),
          "isolamento_domiciliare": parseInt(newData.isolamento_domiciliare),
          "totale_positivi": parseInt(newData.totale_positivi),
          "variazione_totale_positivi": parseInt(newData.variazione_totale_positivi),
          "nuovi_positivi": parseInt(newData.nuovi_positivi),
          "dimessi_guariti": parseInt(newData.dimessi_guariti),
          "deceduti": parseInt(newData.deceduti),
          "totale_casi": parseInt(newData.totale_casi),
          "tamponi": parseInt(newData.tamponi),
          "casi_testati": parseInt(newData.casi_testati.Int64)
        })
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);

          // success
          setSuccessMessages([res.data.message])
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
    api
      .delete("/andamento/nazionale/data/" + oldData.data)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();

        // success
        setSuccessMessages([res.data.message])
        setIssuccess(true);
      })
      .catch((error) => {
        //setErrorMessages(["Delete failed! Server error"]);
        setErrorMessages(error.response.data.message);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div className="TrendNazionale container">
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
      {auth ? (
        <MaterialTable
          title="COVID-19 Andamento Nazionale"
          columns={columns}
          data={data}
          icons={tableIcons}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
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
      ) : (
        <MaterialTable
          title="COVID-19 Andamento Nazionale"
          columns={columns}
          data={data}
          icons={tableIcons}
        />
      )}
    </div>
  );
}

export default TrendNazionale;
