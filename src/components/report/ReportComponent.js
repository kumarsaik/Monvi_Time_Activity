import React from "react";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import moment from "moment";
import {
  Box,
  Divider,
  Typography,
  makeStyles,
  Grid,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import PrintIcon from "@material-ui/icons/Print";
import { reportStyle } from "./ReportStyle";

const useStyles = makeStyles(() => reportStyle);

const ReportData = ({ exportAsPdf, printTable, data, headers }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorElHandleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <div className={classes.iconHeader}>
            <div className={classes.headIcons}>
              <ImportExportIcon onClick={anchorElHandleClick} />
              <PrintIcon onClick={printTable} />
            </div>
          </div>
          <Divider />
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <div className={classes.exportList}>
              <CSVLink
                className={classes.exportListItem}
                data={data}
                headers={headers}
              >
                <span>Export as CSV</span>
              </CSVLink>
              <span className={classes.exportListItem} onClick={exportAsPdf}>
                Export as PDF
              </span>
            </div>
          </Popper>
        </Grid>
        {/* <Card
      className={clsx(classes.root, className)}
      {...rest}
    > */}
        <div className={classes.header}>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Typography color="textSecondary" variant="body1">
              Time Activities by Emp
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              Activity:{`${moment().format(" MMMM Do YYYY")}`}
            </Typography>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Empolyee Name: Dilip Gudivada
          </Typography>
        </div>
        <Divider />
        {/* </Card> */}
      </Grid>
      <TableContainer component={Paper} id="table-data-container">
        <Table
          className={classes.table}
          aria-label="simple table"
          id="table-data"
        >
          <TableHead>
            <TableRow>
              <TableCell>Activity Date</TableCell>
              <TableCell align="right">Customer</TableCell>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Memo</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Billable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.date}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.customer_name}</TableCell>
                <TableCell align="right">{row.service_name}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.billable == 1? "True":"False"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

ReportData.propTypes = {
  className: PropTypes.string,
};

export default ReportData;
