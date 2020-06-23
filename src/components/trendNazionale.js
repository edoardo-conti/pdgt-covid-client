import React, { useState, useEffect, forwardRef } from "react";
// GUI
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from "@material-ui/core/LinearProgress";
// chart
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale, Animation } from "@devexpress/dx-react-chart";
import { scalePoint } from "d3-scale";
import { withStyles } from "@material-ui/core/styles";
// date handler
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
// css
import "./trendNazionale.css";
// helper.js
import { isAuthenticated, validateDate, api } from "../helper";

// chart const
const chartRootStyles = {
  chart: {
    paddingRight: "20px",
  },
};
const legendStyles = {
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
};
const legendLabelStyles = (theme) => ({
  label: {
    paddingTop: theme.spacing(1),
  },
});
const legendItemStyles = {
  item: {
    flexDirection: "column",
  },
};
const ChartRootBase = ({ classes, ...restProps }) => (
  <Chart.Root {...restProps} className={classes.chart} />
);
const LegendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const LegendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label {...restProps} className={classes.label} />
);
const LegendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item {...restProps} className={classes.item} />
);
const ChartRoot = withStyles(chartRootStyles, { name: "ChartRoot" })(
  ChartRootBase
);
const LegendRoot = withStyles(legendStyles, { name: "LegendRoot" })(
  LegendRootBase
);
const LegendLabel = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  LegendLabelBase
);
const LegendItem = withStyles(legendItemStyles, { name: "LegendItem" })(
  LegendItemBase
);

// table const
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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function TrendNazionale() {
  //table auth
  const [auth, setAuth] = useState([]);
  //table data
  const [data, setData] = useState([]);
  const [datanazloaded, setDadaNazLoaded] = useState(false);
  //picco
  const [picco, setPicco] = useState([]);
  //gestione errori
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  //gestione messaggi
  const [issuccess, setIssuccess] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);

  // colonne tabelle popolate da dati API
  var columns = [
    { title: "Data", field: "data", editable: "onAdd", initialEditValue: '2020-02-23' },
    { title: "Stato", field: "stato", hidden: true },
    {
      title: "Ricoverati sintomatici",
      field: "ricoverati_con_sintomi",
      type: "numeric",
    },
    { title: "Terapia Intensiva", field: "terapia_intensiva", type: "numeric" },
    {
      title: "Totale Ospedalizzati",
      field: "totale_ospedalizzati",
      type: "numeric",
    },
    {
      title: "Isolamento Domiciliare",
      field: "isolamento_domiciliare",
      type: "numeric",
    },
    { title: "Totale Positivi", field: "totale_positivi", type: "numeric" },
    {
      title: "Variazione Totale Positivi",
      field: "variazione_totale_positivi",
      type: "numeric",
    },
    { title: "Nuovi Positivi", field: "nuovi_positivi", type: "numeric" },
    { title: "Dimessi Guariti", field: "dimessi_guariti", type: "numeric" },
    { title: "Deceduti", field: "deceduti", type: "numeric" },
    { title: "Totale Casi", field: "totale_casi", type: "numeric" },
    { title: "Tamponi", field: "tamponi", type: "numeric" },
    { title: "Casi Testati", field: "casi_testati.Int64", type: "numeric" },
  ];

  useEffect(() => {
    // controllo se l'utente è loggato
    if (isAuthenticated()) setAuth(true);
    else {
      setAuth(false);
    }

    // GET /trend/nazionale
    api
      .get("/trend/nazionale", {
        responseType: "json",
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log("Error");
      });
    // GET /trend/nazionale/picco
    api
      .get("/trend/nazionale/picco", {
        responseType: "json",
      })
      .then((res) => {
        setPicco(res.data.data);

        // termino progress
        setDadaNazLoaded(true);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  // data per grafico
  const datagraph = [];
  data.map(function (record) {
    datagraph.push({
      data: record.data,
      nuovi_positivi: record.nuovi_positivi,
      terapia_intensiva: record.terapia_intensiva,
    });

    return null;
  });

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
  
    if (newData.ricoverati_con_sintomi === "") {
      errorList.push("Per favore compila ricoverati_con_sintomi");
    }
    if (newData.terapia_intensiva === "") {
      errorList.push("Per favore compila terapia_intensiva");
    }
    if (newData.totale_ospedalizzati === "") {
      errorList.push("Per favore compila totale_ospedalizzati");
    }
    if (newData.isolamento_domiciliare === "") {
      errorList.push("Per favore compila isolamento_domiciliare");
    }
    if (newData.totale_positivi === "") {
      errorList.push("Per favore compila totale_positivi");
    }
    if (newData.variazione_totale_positivi === "") {
      errorList.push("Per favore compila variazione_totale_positivi");
    }
    if (newData.nuovi_positivi === "") {
      errorList.push("Per favore compila nuovi_positivi");
    }
    if (newData.dimessi_guariti === "") {
      errorList.push("Per favore compila dimessi_guariti");
    }
    if (newData.deceduti === "") {
      errorList.push("Per favore compila deceduti");
    }
    if (newData.totale_casi === "") {
      errorList.push("Per favore compila totale_casi");
    }
    if (newData.tamponi === "") {
      errorList.push("Per favore compila tamponi");
    }
    if (newData.casi_testati === "") {
      errorList.push("Per favore compila casi_testati");
    }

    if (errorList.length < 1) {
      // PATCH /trend/nazionale/data/:bydate
      api
        .patch("/trend/nazionale/data/" + newData.data, {
          ricoverati_con_sintomi: parseInt(newData.ricoverati_con_sintomi),
          terapia_intensiva: parseInt(newData.terapia_intensiva),
          totale_ospedalizzati: parseInt(newData.totale_ospedalizzati),
          isolamento_domiciliare: parseInt(newData.isolamento_domiciliare),
          totale_positivi: parseInt(newData.totale_positivi),
          variazione_totale_positivi: parseInt(
            newData.variazione_totale_positivi
          ),
          nuovi_positivi: parseInt(newData.nuovi_positivi),
          dimessi_guariti: parseInt(newData.dimessi_guariti),
          deceduti: parseInt(newData.deceduti),
          totale_casi: parseInt(newData.totale_casi),
          tamponi: parseInt(newData.tamponi),
          casi_testati: parseInt(newData.casi_testati.Int64),
        }, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("x-access-token"),
          },
          responseType: "json",
        })
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          // errori
          setIserror(false);
          setErrorMessages([]);
          // messaggi
          setSuccessMessages([res.data.message]);
          setIssuccess(true);
        })
        .catch((error) => {
          // errori
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

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];

    if (newData.data === undefined || !validateDate(newData.data)) {
      errorList.push("Per favore inserisci una data con formato corretto");
    }
    if (newData.ricoverati_con_sintomi === undefined) {
      errorList.push("Per favore compila ricoverati_con_sintomi");
    }
    if (newData.terapia_intensiva === undefined) {
      errorList.push("Per favore compila terapia_intensiva");
    }
    if (newData.totale_ospedalizzati === undefined) {
      errorList.push("Per favore compila totale_ospedalizzati");
    }
    if (newData.isolamento_domiciliare === undefined) {
      errorList.push("Per favore compila isolamento_domiciliare");
    }
    if (newData.totale_positivi === undefined) {
      errorList.push("Per favore compila totale_positivi");
    }
    if (newData.variazione_totale_positivi === undefined) {
      errorList.push("Per favore compila variazione_totale_positivi");
    }
    if (newData.nuovi_positivi === undefined) {
      errorList.push("Per favore compila nuovi_positivi");
    }
    if (newData.dimessi_guariti === undefined) {
      errorList.push("Per favore compila dimessi_guariti");
    }
    if (newData.deceduti === undefined) {
      errorList.push("Per favore compila deceduti");
    }
    if (newData.totale_casi === undefined) {
      errorList.push("Per favore compila totale_casi");
    }
    if (newData.tamponi === undefined) {
      errorList.push("Per favore compila tamponi");
    }
    if (newData.casi_testati === undefined) {
      errorList.push("Per favore compila casi_testati");
    }

    //se nessun errore...
    if (errorList.length < 1) {
      api
        // POST /trend/nazionale {newData}
        .post("/trend/nazionale", {
          data: newData.data,
          ricoverati_con_sintomi: newData.ricoverati_con_sintomi,
          terapia_intensiva: newData.terapia_intensiva,
          totale_ospedalizzati: newData.totale_ospedalizzati,
          isolamento_domiciliare: newData.isolamento_domiciliare,
          totale_positivi: newData.totale_positivi,
          variazione_totale_positivi: newData.variazione_totale_positivi,
          nuovi_positivi: newData.nuovi_positivi,
          dimessi_guariti: newData.dimessi_guariti,
          deceduti: newData.deceduti,
          totale_casi: newData.totale_casi,
          tamponi: newData.tamponi,
          casi_testati: newData.casi_testati.Int64,
        }, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("x-access-token"),
          },
          responseType: "json",
        })
        .then((res) => {
          // todo: app crash
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();

          setErrorMessages([]);
          setIserror(false);
          // success
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
    let errorList = [];

    // DELETE /trend/nazionale/data/:bydate
    api
      .delete("/trend/nazionale/data/" + oldData.data, {
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
        // success
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

  // ### ricerca trend per data (in basso a destra) ###
  const [selectedDatePick, setSelectedDatePick] = React.useState(
    new Date("2020-02-24")
  );
  const handleDateChangePick = (datepick) => {
    setSelectedDatePick(datepick);
  };
  const [recordByDateHit, setRecordByDateHit] = useState(false);
  const [recordByDate, setRecordByDate] = useState([]);
  const [iserrorDate, setIsErrorDate] = useState(false);
  const [errorDateMessages, setErrorDateMessages] = useState([]);

  function searchTrendByDate() {
    setIsErrorDate(false);

    // GET /trend/nazionale/data/:bydate
    api
      .get(
        "/trend/nazionale/data/" +
          moment(selectedDatePick).format("YYYY-MM-DD"),
        {
          responseType: "json",
        }
      )
      .then((res) => {
        setRecordByDate(res.data.data);
        setRecordByDateHit(true);
      })
      .catch((error) => {
        setErrorDateMessages([error.response.data.message]);
        setIsErrorDate(true);
      });
  }

  // useStyles
  const classes = useStyles();

  return (
    <div className="TrendNazionale container">
      {!datanazloaded ? <LinearProgress /> : ""}
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
          title="Covid-19 Andamento Nazionale"
          columns={columns}
          data={data}
          icons={tableIcons}
        />
      )}
      <br />
      <br />
      <Paper elevation={3}>
        <Chart data={datagraph} rootComponent={ChartRoot}>
          <ArgumentScale factory={scalePoint} />
          <ValueAxis />

          <AreaSeries
            name="Nuovi Positivi"
            valueField="nuovi_positivi"
            argumentField="data"
          />
          <AreaSeries
            name="Terapia Intensiva"
            valueField="terapia_intensiva"
            argumentField="data"
          />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          />
          <Title text="Nuovi Positivi e Ricoverati in Terapia Intensiva in Italia [24/02/20 - 07/06/20]" />
        </Chart>
      </Paper>
      <br />
      <br />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <h3>Picco nazionale di Nuovi Positivi</h3>
                </Typography>
                <Divider /><br />
                <h3>{moment(picco.data).format("YYYY-MM-DD")}</h3>
                <List>
                  <ListItem><ListItemText primary="Ricoverati con sintomi" secondary={picco.ricoverati_con_sintomi}/></ListItem>
                  <ListItem><ListItemText primary="Terapia intensiva" secondary={picco.terapia_intensiva}/></ListItem>
                  <ListItem><ListItemText primary="Totale ospedalizzati" secondary={picco.totale_ospedalizzati}/></ListItem>
                  <ListItem><ListItemText primary="Isolamento domiciliare:" secondary={picco.isolamento_domiciliare}/></ListItem>
                  <ListItem><ListItemText primary="Totale positivi" secondary={picco.totale_positivi}/></ListItem>
                  <ListItem><ListItemText primary="Variazione totale positivi" secondary={picco.variazione_totale_positivi}/></ListItem>
                  <ListItem><ListItemText primary="Nuovi positivi" secondary={picco.nuovi_positivi}/></ListItem>
                  <ListItem><ListItemText primary="Dimessi guariti" secondary={picco.dimessi_guariti}/></ListItem>
                  <ListItem><ListItemText primary="Deceduti" secondary={picco.deceduti}/></ListItem>
                  <ListItem><ListItemText primary="Totale casi" secondary={picco.totale_casi}/></ListItem>
                  <ListItem><ListItemText primary="Tamponi" secondary={picco.tamponi}/></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
          <Card className={classes.root}>
              <CardContent>
              {iserrorDate && (
                <Alert severity="error">
                  {errorDateMessages.map((msg, i) => {
                    return <div key={i}>{msg}</div>;
                  })}
                </Alert>
              )}
              <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <h3>Ricerca Trend nazionale per data</h3>
                </Typography>
                <Divider /><br />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline"
                  value={selectedDatePick}
                  onChange={handleDateChangePick}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SearchIcon />}
                onClick={() => {
                  searchTrendByDate();
                }}
              >
                Ricerca
              </Button>
              <Divider /><br />
              {recordByDateHit && <h3>{moment(recordByDate.data).format("YYYY-MM-DD")}</h3> }
              {recordByDateHit && (
                <List>
                  <ListItem><ListItemText primary="Ricoverati con sintomi" secondary={recordByDate.ricoverati_con_sintomi}/></ListItem>
                  <ListItem><ListItemText primary="Terapia intensiva" secondary={recordByDate.terapia_intensiva}/></ListItem>
                  <ListItem><ListItemText primary="Totale ospedalizzati" secondary={recordByDate.totale_ospedalizzati}/></ListItem>
                  <ListItem><ListItemText primary="Isolamento domiciliare:" secondary={recordByDate.isolamento_domiciliare}/></ListItem>
                  <ListItem><ListItemText primary="Totale positivi" secondary={recordByDate.totale_positivi}/></ListItem>
                  <ListItem><ListItemText primary="Variazione totale positivi" secondary={recordByDate.variazione_totale_positivi}/></ListItem>
                  <ListItem><ListItemText primary="Nuovi positivi" secondary={recordByDate.nuovi_positivi}/></ListItem>
                  <ListItem><ListItemText primary="Dimessi guariti" secondary={recordByDate.dimessi_guariti}/></ListItem>
                  <ListItem><ListItemText primary="Deceduti" secondary={recordByDate.deceduti}/></ListItem>
                  <ListItem><ListItemText primary="Totale casi" secondary={recordByDate.totale_casi}/></ListItem>
                  <ListItem><ListItemText primary="Tamponi" secondary={recordByDate.tamponi}/></ListItem>
                </List>
              )}
            </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TrendNazionale;
