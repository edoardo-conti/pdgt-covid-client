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
  var columns = [
    { title: "stato", field: "stato", hidden: "true" },
    { title: "codice_regione", field: "codice_regione", hidden: "true" },
    { title: "denominazione_regione", field: "denominazione_regione" },
    { title: "totale_casi", field: "totale_casi" },
    { title: "deceduti", field: "deceduti" },
    { title: "dimessi_guariti", field: "dimessi_guariti" },
    { title: "tamponi", field: "tamponi" },
  ];

  //table data
  const [data, setData] = useState([]);

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
  }, []);

  return (
    <div className="TrendRegionale container">
      <MaterialTable
        title="COVID-19 Andamento Regionale"
        columns={columns}
        data={data}
        icons={tableIcons}
        detailPanel={(rowData) => {

          /*
          getTrendByRegioni("13")
          .then((data) => {
            a = data;
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
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </Table>
            </Box>
          );
        }}
        //onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </div>
  );
}

export default TrendRegionale;
