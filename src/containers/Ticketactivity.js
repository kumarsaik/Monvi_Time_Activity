import React from "react";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import Axios from "axios";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import EditIcon from "@material-ui/icons/Edit";
import EditModel from "../components/ticketActivity/EditModel";
import TicketActivityRow from "../components/ticketActivity/TicketActivityRow";
import { useDispatch, useSelector } from "react-redux";
import {
  getTicketActivityData,
  getRowFilterToEdit,
} from "../redux/actions/ticketActivityActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Ticketactivity = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const headers = [
    { label: "Ticket_id", key: "ticket_id" },
    { label: "AssignedTo", key: "ticket_assignedto" },
    { label: "Date", key: "ticket_createddate" },
    { label: "Status", key: "ticket_status" },
  ];

  const [Data, setData] = React.useState([]);
  const [openEditModel, setOpenopenEditModel] = React.useState(false);
  const rows = useSelector((state) => state.ticketActivityReducer.rows);
  console.log("rows:::", rows);

  React.useEffect(() => {
    dispatch(getTicketActivityData());
  }, [rows]);

  const handleEdit = (rowVal) => {
    var Cells = rowVal.current.getElementsByTagName("td");
    dispatch(getRowFilterToEdit(Cells[0].innerText));
    setOpenopenEditModel(true);
  };

  const handleClose = (newValue) => {
    setOpenopenEditModel(false);
    dispatch(getTicketActivityData());
  };

  const getReport = () => {
    Axios.get("http://localhost:5000/ticket")
      .then(function(response) {
        console.log("response", response);
        setData(response.data.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  React.useEffect(() => {
    getReport();
  }, []);
  return (
    <Page className={classes.root} title="Ticketactivity">
      <Container maxWidth={false}>
        <Toolbar />
        <TableContainer component={Paper} id="table-data-container">
          <Table
            className={classes.table}
            aria-label="simple table"
            id="table-data"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"> Ticket_id</StyledTableCell>
                <StyledTableCell align="right">AssignedTo</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <>
                  <TicketActivityRow
                    key={row.date}
                    row={row}
                    handleEdit={handleEdit}
                  />
                  {/* <StyledTableRow key={row.date}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <StyledTableCell align="right" component="th" scope="row">
                      {row.ticket_id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.ticket_assignedto}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.ticket_createddate}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.ticket_status}
                    </StyledTableCell>
                  </StyledTableRow> */}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <EditModel
        classes={{
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={openEditModel}
        onClose={handleClose}
      />
    </Page>
  );
};

export default Ticketactivity;
