import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import EditModel from "../components/ticketActivity/EditModel";
import TicketActivityRow from "../components/ticketActivity/TicketActivityRow";
import { useDispatch, useSelector } from "react-redux";
import {
  getRowFilterToEdit,
  getTicketRowData,
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

  const [openEditModel, setOpenopenEditModel] = React.useState(false);
  const rows = useSelector((state) => state.ticketActivityReducer.rows);
  console.log("rows:::", rows);

  const handleEdit = (rowVal) => {
    var Cells = rowVal.current.getElementsByTagName("td");
    dispatch(getRowFilterToEdit(Cells[0].innerText));
    setOpenopenEditModel(true);
  };

  const handleClose = (newValue) => {
    setOpenopenEditModel(false);
  };

  React.useEffect(() => {
    dispatch(getTicketRowData());
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
                <StyledTableCell align="left"> Ticket_id</StyledTableCell>
                <StyledTableCell align="left">AssignedTo</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
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
