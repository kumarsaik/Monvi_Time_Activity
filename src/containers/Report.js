import React from "react";
import Page from "src/components/Page";
import ReportData from "../components/report/ReportComponent";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { makeStyles, Grid } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { getReportData } from "../redux/actions/reportActions";

const useStyles = makeStyles({
  root: {
    margin: 5,
  },
  table: {
    minWidth: 650,
  },
});

const headers = [
  { label: "Activity Date", key: "date" },
  { label: "Customer", key: "customer_name" },
  { label: "Product", key: "service_name" },
  { label: "Memo", key: "description" },
  { label: "Duration", key: "time" },
  { label: "Billable", key: "billable" },
];

export default function Report() {
  const classes = useStyles();
  const [rowData, setRowData] = React.useState([]);
  const rows = useSelector((state) => state.reportReducer.rows);
  const dispatch = useDispatch();
  const getReport = () => {
    axios
      .get("http://localhost:5000/api/timeactivity", {})
      .then(function(response) {
        console.log(response);
        setRowData(response.data.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    console.log("Run useEffect");
    getReport();
    dispatch(getReportData());
  }, []);

  const exportAsPdf = () => {
    var doc = new jsPDF();
    autoTable(doc, { html: "#table-data" });
    doc.save("table.pdf");
  };
  const printTable = () => {
    var content = document.getElementById("table-data-container");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    console.log("content", content.innerHTML);
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  return (
    <Page className={classes.root} title="Report">
      <iframe
        id="ifmcontentstoprint"
        style={{ height: "0px", width: "0px", position: "absolute" }}
      ></iframe>
      <div id="test-test"></div>
      <Grid item xs={12}>
        <ReportData
          exportAsPdf={exportAsPdf}
          printTable={printTable}
          headers={headers}
          data={rowData}
        />
      </Grid>
    </Page>
  );
}
