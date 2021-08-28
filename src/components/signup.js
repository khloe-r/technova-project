import React, { useState, useEffect, useRef } from "react";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext.js";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, Container, Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    alignContent: "center",
    alignItems: "center",
    maxWidth: "40%",
    padding: 18,
  },
  card: {
    padding: 35,
    backgroundColor: "#46633C",
    color: "white",
    borderRadius: "25px",
    marginTop: "60px",
  },
  textfield: {
    backgroundColor: "#668B59",
  },
  button: {
    minWidth: "40%",
    backgroundColor: "#113516",
    color: "white",
    borderRadius: "103px",
  },
  appName: {
    fontFamily: "Cardo",
    fontWeight: 500,
    color: "#56365F",
    letterSpacing: 2,
    fontSize: 50,
    margin: "50px 0px 0px",
  },
});

export default function Signup() {
  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordConfirmRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("signing up!");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return console.log("error");
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      console.log("error");
    }
  }

  return (
    <>
      <Grid className={classes.grid}>
        <h1 className={classes.appName}> willow </h1>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Card className={classes.card}>
              <h2>Sign Up</h2>
              <Grid container spacing={5} justifyContent="center">
                <Grid item lg={10} xs={10}>
                  <TextField fullWidth className={classes.textfield} variant="filled" label="Email" inputRef={emailRef} />
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField fullWidth className={classes.textfield} variant="filled" label="Password" type="password" inputRef={passwordRef} />
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField fullWidth className={classes.textfield} variant="filled" label="Confirm Password" type="password" inputRef={passwordConfirmRef} />
                </Grid>
                <Grid item lg={10} xs={10}>
                  <Button className={classes.button} variant="contained" type="submit">
                    Sign Up
                  </Button>
                </Grid>
                <Grid item lg={10} xs={10} class>
                  Already a member?{" "}
                  <Link to="/login" style={{ color: "white" }}>
                    Log In
                  </Link>
                </Grid>
              </Grid>
            </Card>
          </form>
        </div>
      </Grid>
    </>
  );
}
