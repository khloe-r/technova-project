import { Button, Grid, Dialog, DialogActions, DialogContent, Card, Chip, Input, CircularProgress, InputLabel, DialogContentText, MenuItem, DialogTitle, TextField, Select } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase/app";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles({
  appName: {
    fontFamily: "Cardo",
    fontWeight: 500,
    color: "#56365F",
    letterSpacing: 2,
    fontSize: 25,
    textAlign: "left",
    margin: "40px 10px 0px",
  },
  button: {
    backgroundColor: "#6E8C63",
    color: "white",
    marginTop: 50,
    borderRadius: "25px",
    fontSize: "18px",
    minHeight: "75px",
    minWidth: "325px",
  },
  link: {
    backgroundColor: "#6E8C63",
    color: "white",
    textDecoration: "none",
    fontSize: 11,
  },
  title: {
    fontSize: 14,
    fontFamily: "Halant",
    fontWeight: 300,
  },
  root: {
    backgroundColor: "#56365F",
    color: "white",
    margin: 10,
    padding: 10,
    minHeight: 100,
  },
  longbutton: {
    minWidth: "40%",
    backgroundColor: "#113516",
    color: "white",
    borderRadius: "103px",
  },
  dialog: {
    backgroundColor: "#56365F",
    color: "#fff",
    textAlign: "center",
  },
});

export default function SymptomTracker() {
  var dayjs = require("dayjs");
  var customParseFormat = require("dayjs/plugin/customParseFormat");
  dayjs.extend(customParseFormat);

  const [open, setOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [events, setEvents] = React.useState(false);
  const folderRef = useRef();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const classes = useStyles();
  const userRef = firebase.firestore().collection("users");
  const { currentUser } = useAuth();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSymp([]);
    setAlert();
  };
  const handleViewClickOpen = (date) => {
    setViewOpen(true);
    setCurrentDate(date);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };

  const addEvent = () => {
    console.log("adding event");
    console.log(symp);
    const date = String(selectedDate).split(" ").slice(1, 4).join("-");
    console.log(date);
    userRef
      .doc(currentUser.uid)
      .update({
        [`symptoms.${date}`]: symp,
      })
      .then(() => {
        setAlert(true);
      });
  };

  const [symp, setSymp] = React.useState([]);

  function getUser() {
    console.log("getting");
    setLoading(true);
    userRef.doc(currentUser.uid).onSnapshot((doc) => {
      if (doc.exists) {
        setEvents(doc.data().symptoms);
      }
    });
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (event) => {
    setSymp(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const symptoms = ["Headaches", "Nausea", "Muscle Pain", "Cramps", "Fatigue", "Insomnia", "Menustration"];

  // Calendar
  const [now, setNow] = useState(dayjs());
  const n = now.daysInMonth();

  function forwardMonth() {
    setNow(now.add(1, "month"));
  }
  function backwardMonth() {
    setNow(now.subtract(1, "month"));
  }

  if (loading) {
    return <CircularProgress color="#fff" />;
  }

  return (
    <>
      <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white", paddingTop: 50 }}>Health Tracker</h1>
      <p style={{ color: "#fff" }}>Take control of your health! Enter symptoms or your menustration schedule to track long-term patterns easily!</p>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleClickOpen} className={classes.longbutton}>
            Enter a symptom or menustration day
          </Button>
        </Grid>
      </Grid>

      <h1 style={{ fontFamily: "Halant", fontSize: "30px", color: "white", paddingTop: 50 }}>
        <ArrowBackIcon onClick={backwardMonth} />
        <span style={{ marginLeft: 20, marginRight: 20 }}>{dayjs(now).format("MMMM YYYY")}</span>
        <ArrowForwardIcon onClick={forwardMonth} />
      </h1>
      {/* {Object.keys(events).map((eve) => {
        return <h1>{eve}</h1>;
      })} */}
      <Grid container justifyContent="center" style={{ marginLeft: 275 }}>
        {[...Array(n)].map((e, i) => {
          return (
            <>
              <Grid item xs={1} key={i + 1} id={`${i < 9 ? "0" : ""}${i + 1}`}>
                <Card className={classes.root}>
                  <p>{`${i < 9 ? "0" : ""}${i + 1}`}</p>
                  {Object.keys(events).includes(`${dayjs(now).format("MMM")}-${i < 9 ? "0" : ""}${i + 1}-${dayjs(now).format("YYYY")}`) && (
                    <Button className={classes.link} onClick={() => handleViewClickOpen(`${dayjs(now).format("MMM")}-${i < 9 ? "0" : ""}${i + 1}-${dayjs(now).format("YYYY")}`)}>
                      Symptoms Recorded
                    </Button>
                  )}
                </Card>
              </Grid>
              {(i + 1) % 7 === 0 && (
                <Grid item xs={5} key={i + 1}>
                  <span> </span>
                </Grid>
              )}
              {i === n - 1 && (
                <Grid item xs={12 - (n % 7)} key={i + 1}>
                  <span> </span>
                </Grid>
              )}
            </>
          );
        })}
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.dialog} id="form-dialog-title">
          <span style={{ fontFamily: "Halant", fontSize: 30 }}>Enter symptom or menustration day</span>
        </DialogTitle>
        <DialogContent style={{ minWidth: 500 }}>
          {/* <Select autoFocus margin="dense" multiple onChange={handleChange} select id="name" label="What did you experience? You can select multiple!" type="text" fullWidth inputRef={folderRef}>
            {symptoms.map((symp) => {
              return (
                <MenuItem key={symp} value={symp}>
                  {symp}
                </MenuItem>
              );
            })}
          </Select> */}
          <InputLabel id="demo-mutiple-name-label" style={{ margin: "20px 0" }}>
            Select any symptoms you experienced!
          </InputLabel>
          <Select fullWidth labelId="demo-mutiple-name-label" id="demo-mutiple-name" multiple value={symp} onChange={handleChange} input={<Input />} MenuProps={MenuProps}>
            {symptoms.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          {/* <p>Selected Symptoms:</p>
          {symp.map((s) => {
            return <Chip label={s} />;
          })} */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              fullWidth
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          {alert && <Alert severity="success">Symptoms have been recorded!</Alert>}
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button onClick={handleClose} color="primary" style={{ color: "#fff" }}>
            Cancel
          </Button>
          <Button onClick={addEvent} color="primary" style={{ color: "#fff" }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={viewOpen} onClose={handleViewClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.dialog} id="form-dialog-title">
          <span style={{ fontFamily: "Halant", fontSize: 30 }}>{dayjs(currentDate, "MMM-DD-YYYY").format("MMMM D, YYYY")}</span>
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <p>On {dayjs(currentDate, "MMM-DD-YYYY").format("MMMM D, YYYY")}, you experienced the following:</p>
          {events[currentDate]?.map((sy) => {
            return (
              <>
                <Chip label={sy} />
                <span> </span>
              </>
            );
          })}
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button onClick={handleViewClose} color="primary">
            <span style={{ color: "#fff" }}>Close</span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
