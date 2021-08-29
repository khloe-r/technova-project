import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import cover from "../assets/medimg.svg";

const useStyles = makeStyles({
  root: {
    color: "white",
  },
  grid: {
    padding: 60,
    backgroundColor: "#46633C",
    color: "white",
    borderRadius: "25px",
  },
  button: {
    backgroundColor: "#6E8C63",
    color: "white",
    borderRadius: "103px",
    width: "60%",
    margin: 5,
  },
  appName: {
    fontFamily: "Cardo",
    fontWeight: 600,
    color: "#56365F",
    letterSpacing: 2,
    fontSize: 75,
    margin: "15px 0px 0px",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <h1 className={classes.appName}>willow</h1>
        <h3 style={{ fontFamily: "Halant", fontWeight: 300, letterSpacing: 1 }}>Welcome to your</h3>
        <h2 style={{ fontFamily: "Halant", fontWeight: 600, marginTop: "-15px", fontSize: 30 }}>Women's Health Guide</h2>
        <Grid container spacing={3} style={{ marginBottom: 50 }}>
          <Grid item xs={6}>
            <img src={cover} height={235} style={{ marginTop: "-40px" }} alt="Young girl speaking with doctor" />
          </Grid>

          <Grid item xs={5}>
            <h2 style={{ fontFamily: "Halant", fontWeight: 600 }}>Take control of your health</h2>
            <p style={{ fontFamily: "Halant", margin: "-10px 0px 40px" }}>
              It is time to bridge the literacy gap in women’s health, educate women on how their body functions and inform them of what is normal and what isn’t, feel comfortable voicing their concerns and have access to educational resources to validate their worries.
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={5} justifyContent="space-around">
          <Grid item lg={3} xs={4} className={classes.grid}>
            <h3>New Member?</h3>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button className={classes.button} variant="contained">
                Sign Up
              </Button>
            </Link>
          </Grid>

          <Grid item lg={3} xs={4} className={classes.grid}>
            <h3>Existing Member?</h3>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button className={classes.button} variant="contained">
                Log In
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
