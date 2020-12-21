import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { updateTicketRowData } from "../../redux/actions/ticketActivityActions";

import { TextField, Input, Grid, Select } from "@material-ui/core";

function EditModel(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const filteredRow = useSelector(
    (state) => state.ticketActivityReducer.filteredRow
  );
  const [updateRow, setUpdateRow] = React.useState(filteredRow);
  console.log("updateRow::::", updateRow);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);
  React.useEffect(() => {
    setUpdateRow(filteredRow);
  }, [filteredRow]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOnchageValue = (event) => {
    console.log("event", event.target.value);
    setUpdateRow({ ...updateRow, [event.target.name]: event.target.value });
  };
  const handleOk = () => {
    dispatch(updateTicketRowData(updateRow));
    onClose();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <div className={classes.dialogBox}>
        <Grid xs={12} className={classes.firstInputFieldStyle}>
          <label className={classes.labelWidth}>AssignedTo</label>
          <Input
            name="ticket_assignedto"
            value={updateRow.ticket_assignedto}
            onChange={handleOnchageValue}
          />
        </Grid>
        <Grid xs={12} className={classes.inputFieldStyle}>
          <label className={classes.labelWidth}>email</label>
          <Input
            value={updateRow.email}
            name="email"
            onChange={handleOnchageValue}
          />
        </Grid>
        <Grid xs={12} className={classes.inputFieldStyle}>
          <label className={classes.labelWidth}>Status</label>
          <Select
            native
            onChange={handleOnchageValue}
            className={classes.selectStyle}
            value={updateRow.ticket_status}
            name="ticket_status"
          >
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Close">Close</option>
          </Select>
        </Grid>

        <Grid xs={12} className={classes.inputFieldStyle}>
          <label className={classes.discriptionLabel}>Description</label>
          <TextField
            id="standard-multiline-static"
            multiline
            rows={4}
            variant="outlined"
            value={updateRow.ticket_content}
            name="ticket_content"
            onChange={handleOnchageValue}
          />
        </Grid>
      </div>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: "80%",
    maxHeight: 435,
  },
  firstInputFieldStyle: {
    marginBottom: "15px",
    display: "flex",
    marginTop: "45px",
    marginLeft: "50px",
  },
  inputFieldStyle: {
    marginBottom: "15px",
    display: "flex",
    marginLeft: "50px",
  },
  labelWidth: {
    width: "150px",
  },
  dialogBox: {
    width: "500px",
    height: "300px",
  },
  discriptionLabel: {
    width: "150px",
    marginTop: "40px",
  },
  selectStyle: {
    width: "165px",
  },
}));

export default EditModel;
