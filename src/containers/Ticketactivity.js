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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

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
  const [open, setOpen] = React.useState(false);
  const headers = [
    { label: "Ticket_id", key: "ticket_id" },
    { label: "AssignedTo", key: "ticket_assignedto" },
    { label: "Date", key: "ticket_createddate" },
    { label: "Status", key: "ticket_status" },
  ];
  // const intialData = [
  //   {
  //     ticket_id: "9867888",
  //     ticket_assignedto: "Sai",
  //     ticket_createddate: "1-2-2020",
  //     ticket_status: "Open",
  //     user_name: "XYZ",
  //     email: "t@t.com",
  //     ticket_updateddate: "10-20-2020",
  //     ticket_content: "The The The",
  //   },
  //   {
  //     ticket_id: "9867899",
  //     ticket_assignedto: "Lohith",
  //     ticket_createddate: "3-7-2020",
  //     ticket_status: "inprogress...",
  //     user_name: "ABC",
  //     email: "test@test.com",
  //     ticket_updateddate: "10-20-2020",
  //     ticket_content: "The The The",
  //   },
  // ];
  const [Data, setData] = React.useState([]);
  const [openEditModel, setOpenopenEditModel] = React.useState(false);
  const [value, setValue] = React.useState("Dione");

  const handleEdit = (rowVal) => {
    console.log("rowVal", rowVal);
    var Cells = rowVal.current.getElementsByTagName("td");
    console.log("Cells", Cells[2].innerText);
    setOpenopenEditModel(true);
  };

  const handleClose = (newValue) => {
    setOpenopenEditModel(false);

    if (newValue) {
      setValue(newValue);
    }
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
              {Data.map((row) => (
                <>
                  <Row key={row.date} row={row} handleEdit={handleEdit} />
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
        value={value}
      />
    </Page>
  );
};

function Row(props) {
  const { row, handleEdit } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const rowData = React.useRef(null);

  return (
    <React.Fragment>
      <TableRow className={classes.root} ref={rowData}>
        <TableCell component="th">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope="row">{row.ticket_id}</TableCell>
        <TableCell align="right">{row.ticket_assignedto}</TableCell>
        <TableCell align="right">{row.ticket_createddate}</TableCell>
        <TableCell align="right">{row.ticket_status}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            size="small"
            className={classes.button}
            startIcon={<EditIcon />}
            style={{
              borderRadius: 35,
              backgroundColor: "#2c387e",
              color: "#fff",
            }}
            onClick={() => handleEdit(rowData)}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                More
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>user_name</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell align="left">Ticket_updateddate</TableCell>
                    <TableCell align="left">Ticket_content</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow key={historyRow.date}> */}
                  <TableCell component="th" scope="row">
                    {row.user_name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="left">{row.ticket_updateddate}</TableCell>
                  <TableCell align="left">{row.ticket_content}</TableCell>
                  {/* </TableRow> */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Ticketactivity;