import React, { useState, useEffect } from "react";
import "./trendNazionale.css";
import { forwardRef } from "react";

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

import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import moment from "moment"

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { isAuthenticated } from "../helper";

// import { getTrendByRegioni } from "../helper";

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

function TrendRegionale() {
  //table data
  const [data, setData] = useState([]);

  // table regioni
  const [reg1, setReg1] = useState([]);
  const [reg2, setReg2] = useState([]);
  const [reg3, setReg3] = useState([]);
  const [reg5, setReg5] = useState([]);
  const [reg6, setReg6] = useState([]);
  const [reg7, setReg7] = useState([]);
  const [reg8, setReg8] = useState([]);
  const [reg9, setReg9] = useState([]);
  const [reg10, setReg10] = useState([]);
  const [reg11, setReg11] = useState([]);
  const [reg12, setReg12] = useState([]);
  const [reg13, setReg13] = useState([]);
  const [reg14, setReg14] = useState([]);
  const [reg15, setReg15] = useState([]);
  const [reg16, setReg16] = useState([]);
  const [reg17, setReg17] = useState([]);
  const [reg18, setReg18] = useState([]);
  const [reg19, setReg19] = useState([]);
  const [reg20, setReg20] = useState([]);
  const [reg21, setReg21] = useState([]);

  var columns = [
    { title: "stato", field: "stato", hidden: true },
    { title: "codice_regione", field: "codice_regione", hidden: true },
    { title: "denominazione_regione", field: "denominazione_regione" },
    { title: "totale_casi", field: "totale_casi" },
    { title: "deceduti", field: "deceduti" },
    { title: "dimessi_guariti", field: "dimessi_guariti" },
    { title: "tamponi", field: "tamponi" },
  ];

  function collapseTable(data) {
    var regid = data.codice_regione;
    var datatable = [];
    
    switch(regid) {
      case 1: datatable = reg1; break;
      case 2: datatable = reg2; break;
      case 3: datatable = reg3; break;
      case 5: datatable = reg5; break;
      case 6: datatable = reg6; break;
      case 7: datatable = reg7; break;
      case 8: datatable = reg8; break;
      case 9: datatable = reg9; break;
      case 10: datatable = reg10; break;
      case 11: datatable = reg11; break;
      case 12: datatable = reg12; break;
      case 13: datatable = reg13; break;
      case 14: datatable = reg14; break;
      case 15: datatable = reg15; break;
      case 16: datatable = reg16; break;
      case 17: datatable = reg17; break;
      case 18: datatable = reg18; break;
      case 19: datatable = reg19; break;
      case 20: datatable = reg20; break;
      case 21: datatable = reg21; break;
      default: break;
    }
    
    console.log(datatable);

    /*
    getTrendByRegioni(regid)
    .then((response) => {
      console.log(response.data);
  
      setRegdatar(response.data);
    })
    .catch((err) => {
      console.log("error");
    });
    */
  
    return (
      <Box margin={1}>
        <Typography variant="h6" gutterBottom component="div">
          History
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>ricoverati_con_sintomi</TableCell>
              <TableCell>terapia_intensiva</TableCell>
              <TableCell>totale_ospedalizzati</TableCell>
              <TableCell>isolamento_domiciliare</TableCell>
              <TableCell>totale_positivi</TableCell>
              <TableCell>variazione_totale_positivi</TableCell>
              <TableCell>nuovi_positivi</TableCell>
              <TableCell>dimessi_guariti</TableCell>
              <TableCell>deceduti</TableCell>
              <TableCell>totale_casi</TableCell>
              <TableCell>tamponi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {datatable.map((datatableRow) => (
            <TableRow key={datatableRow.data}>
              <TableCell component="th" scope="row">{moment(datatableRow.data).format("YYYY-MM-DD")}</TableCell>
              <TableCell>{datatableRow.info[0].ricoverati_con_sintomi}</TableCell>
              <TableCell>{datatableRow.info[0].terapia_intensiva}</TableCell>
              <TableCell>{datatableRow.info[0].totale_ospedalizzati}</TableCell>
              <TableCell>{datatableRow.info[0].isolamento_domiciliare}</TableCell>
              <TableCell>{datatableRow.info[0].totale_positivi}</TableCell>
              <TableCell>{datatableRow.info[0].variazione_totale_positivi}</TableCell>
              <TableCell>{datatableRow.info[0].nuovi_positivi}</TableCell>
              <TableCell>{datatableRow.info[0].dimessi_guariti}</TableCell>
              <TableCell>{datatableRow.info[0].deceduti}</TableCell>
              <TableCell>{datatableRow.info[0].totale_casi}</TableCell>
              <TableCell>{datatableRow.info[0].tamponi}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </Box>
    );
  }

  useEffect(() => {
    api
      .get("/andamento/regionale", {
        responseType: "json",
      })
      .then((res) => {
        // store dell'ultima rilevazione in modo da ottenere i dati complessivi più recenti
        var last = res.data.count - 1;
        setData(res.data.data[last].info);
        //console.log(res.data.data[104].info);
      })
      .catch((error) => {
        console.log("Error");
      });

    if (isAuthenticated()) {
      api.get("/andamento/regionale/regione/1").then((res) => {setReg1(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/2").then((res) => {setReg2(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/3").then((res) => {setReg3(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/5").then((res) => {setReg5(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/6").then((res) => {setReg6(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/7").then((res) => {setReg7(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/8").then((res) => {setReg8(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/9").then((res) => {setReg9(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/10").then((res) => {setReg10(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/11").then((res) => {setReg11(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/12").then((res) => {setReg12(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/13").then((res) => {setReg13(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/14").then((res) => {setReg14(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/15").then((res) => {setReg15(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/16").then((res) => {setReg16(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/17").then((res) => {setReg17(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/18").then((res) => {setReg18(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/19").then((res) => {setReg19(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/20").then((res) => {setReg20(res.data.data)}).catch((error) => {console.log("Error")});
      api.get("/andamento/regionale/regione/21").then((res) => {setReg21(res.data.data)}).catch((error) => {console.log("Error")});
    }

  }, []);

  return (
      <div className="TrendRegionale container">
        {(isAuthenticated()) ?
        <MaterialTable
          title="COVID-19 Andamento Regionale"
          columns={columns}
          data={data}
          icons={tableIcons}
          detailPanel={(rowData) => collapseTable(rowData)}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
        : 
        <MaterialTable
          title="COVID-19 Andamento Regionale"
          columns={columns}
          data={data}
          icons={tableIcons}
        />
        }
        <br></br><br></br>
        <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card><CardContent><h2>Ricerca Trend Regionale per data</h2></CardContent></Card>
        </Grid>
        <Grid item xs={6}>
          <Card><CardContent><h2>Ricerca Picco Regionale per regione</h2></CardContent></Card>
        </Grid>
      </Grid>
      </div>
  );
}

export default TrendRegionale;
