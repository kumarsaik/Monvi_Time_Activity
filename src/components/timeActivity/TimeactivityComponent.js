import React from "react";
import {
  Divider,
  Typography,
  makeStyles,
  Checkbox,
  TextField,
  Input,
  Grid,
  Box,
  NativeSelect
} from "@material-ui/core";
import Page from "src/components/Page";
import logo from "../../images/reloadtime-circle-512.png";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { timeActivityStyle } from "./TimeactivityStyle";
import axios from "axios";

const useStyles = makeStyles(() => timeActivityStyle);

export default function Timeactivity(props) {
  console.log("props",props.user);
  const classes = useStyles();
  const [user, setUser] = React.useState(props.user);
  const [customerData, setCustomerData] = React.useState([]);
  const [serviceData, setServiceData] = React.useState([]);
  const [toggleCheck, setToggleCheck] = React.useState(true);
  const form = React.useRef(null)
  const timeactivityData = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
    axios
      .post("http://localhost:5000/api/timeactivity", user)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getCustomer();
    getService();

  }, []);
  React.useEffect(()=>{
   setUser({ ...user, billable: toggleCheck })
  }, []);
  const getCustomer = () => {
    axios
      .get("http://localhost:5000/api/customer", {
      })
      .then(function(response) {
        setCustomerData(response.data.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getService = () => {
    axios
      .get("http://localhost:5000/api/service", {
      })
      .then(function(response) {
        setServiceData(response.data.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <Page className={classes.root} title="Timeactivity">
      <Grid item xs={12}>
        <Box component="span" mt={2}>
          <img className={classes.image} src={logo} alt="Logo" />
        </Box>
        <Box component="span" ml={3}>
          <Typography color="textSecondary" display="inline" variant="body2">
            Time Activity
          </Typography>
        </Box>
      </Grid>

      <Divider />
      <form className={classes.root} noValidate autoComplete="off" ref={form} onSubmit={timeactivityData}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Grid xs={12} className={classes.inputFieldStyle}>
              <label className={classes.labelWidth}>Date</label>
              <TextField
                id="date"
                type="date"
                name="user[date]" 
                onChange={e => setUser({ ...user, date: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={12} className={classes.inputFieldStyle}>
              <label className={classes.labelWidth}>Name</label>
              <Input type="text" name="user[name]" placeholder="DilipGudivada" disabled
              onChange={e => setUser({ ...user, name: "DilipGudivada" })}
               />
            </Grid>
            <Grid xs={12} className={classes.inputFieldStyle}>
              <label className={classes.labelWidth}>Customer</label>
              <NativeSelect
              name="user[customer]"
              onChange={e => setUser({ ...user, customer_name: e.target.value })}
              className={classes.selectEmpty}
               >
              <option value="">None</option>
              {customerData.map((row) => (
              <option value={row.customer_name}>{row.customer_name}</option>))}
              </NativeSelect>
            </Grid>
            <Grid xs={12} className={classes.inputFieldStyle}>
              <label className={classes.labelWidth}>Service</label>
              <NativeSelect
              name="user[Service]"
              onChange={e => setUser({ ...user, service_name: e.target.value })}
              className={classes.selectEmpty}
               >
              <option value="">None</option>
              {serviceData.map((row) => (
              <option value={row.service_name}>{row.service_name}</option>))}
              </NativeSelect>
            </Grid>
            <Checkbox
              checked={toggleCheck}
              name="user[billable]"
              onChange={e => setToggleCheck(!toggleCheck)} 
              inputProps={{ "aria-label": "primary checkbox" }}
            />{" "}
            <label>Billable</label>
          </Grid>
          <Grid item xs={6}>
            <Grid xs={12} className={classes.inputFieldStyle}>
              <label className={classes.labelWidth}>Time</label>
              <Input type="text" name="user[time]"
              onChange={e => setUser({ ...user, time: e.target.value })} 
              />
            </Grid>
            <Grid xs={12} className={classes.inputFieldStyle}>
              <label className={classes.discriptionLabel}>Description</label>
              <TextField
                id="standard-multiline-static"
                multiline
                rows={4}
                name="user[description]" 
                onChange={e => setUser({ ...user, description: e.target.value })} 
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      </form>
    </Page>
  );
}
