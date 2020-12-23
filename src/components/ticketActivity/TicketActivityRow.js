import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@material-ui/core";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function TicketActivityRow(props) {
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

export default TicketActivityRow;
