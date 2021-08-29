import { Button, Card } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext.js";
import pfp from "../assets/pfp.png";
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
  card: {
    padding: "10px 50px",
    backgroundColor: "#46633C",
    color: "white",
    borderRadius: "25px",
    marginBottom: 30,
  },
  button: {
    minWidth: "40%",
    backgroundColor: "#113516",
    color: "white",
    borderRadius: "103px",
  },
});

export default function MyAccount() {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout(e) {
    e.preventDefault();
    console.log("logging in");

    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("error");
    }
  }

  return (
    <>
      <h1 className={classes.appName}> willow </h1>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white" }}>My Account</h1>
        <Card className={classes.card}>
          <img src={pfp} style={{ borderRadius: "50%", height: 200, marginTop: 50 }} />
          <h3 style={{ fontFamily: "Halant", fontSize: "35px", color: "white" }}>
            My Name: <span style={{ color: "#917DB2" }}>{currentUser.displayName}</span>
          </h3>

          <h3 style={{ fontFamily: "Halant", fontSize: "35px", color: "white" }}>
            My Email: <span style={{ color: "#917DB2" }}>{currentUser.email}</span>
          </h3>
        </Card>
        <Button className={classes.button} variant="contained" type="submit" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
