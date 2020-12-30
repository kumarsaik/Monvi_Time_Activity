import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddTicketModel from "../components/ticketActivity/AddTicketModel";

const useStyles = makeStyles((theme) => ({
  root: {},
  addButton:{    
    // left: "20px"
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [openAddModel, setOpenAddModel] = React.useState(false);

  const handleAdd = (rowVal) => {
    setOpenAddModel(true);
  };

  const handleClose = (newValue) => {
    setOpenAddModel(false);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.addButton} onClick={handleAdd} color="primary">Add Ticket</Button>
        <Button className={classes.importButton}>
          All Issues
        </Button>
        <Button className={classes.exportButton}>
          My Issues
        </Button>
      </Box>
      <AddTicketModel
        classes={{
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={openAddModel}
        onClose={handleClose}
      />
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
