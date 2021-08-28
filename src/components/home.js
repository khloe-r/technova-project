import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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
    margin: 15,
  },
  appName: {
    fontFamily: "Cardo",
    fontWeight: 500,
    color: "#56365F",
    letterSpacing: 2,
    fontSize: 75,
    margin: "50px 0px 0px",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <h1 className={classes.appName}>willow</h1>
        <h3 style={{ fontFamily: "Halant", fontWeight: 300, letterSpacing: 1 }}>Welcome to your</h3>
        <h2 style={{ fontFamily: "Halant", fontWeight: 600, marginTop: "-15px" }}>Women's Health Guide</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <p>Img</p>
          </Grid>

          <Grid item xs={6}>
            <h2 style={{ fontFamily: "Halant", fontWeight: 600 }}>Take control of your health</h2>
            <p style={{ fontFamily: "Halant", margin: "-10px 0px 40px" }}>With 1 in 5 girls missing school due to lack of menstrual products, there is a significant need for education on women's health and period poverty. </p>
          </Grid>
        </Grid>
        <Grid container spacing={6} justifyContent="space-around">
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
