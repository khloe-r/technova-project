import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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
});

export default function SelfAssess() {
  const classes = useStyles();

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white" }}>Self - Assessment</h1>
        <p style={{ fontFamily: "Halant", fontWeight: 300, color: "white", margin: "30px 0 10px" }}>Please respond to the form questions accurately and relevant to your recent health experiences.</p>
        <Link to="/my-assessment" style={{ textDecoration: "none" }}>
          <Button className={classes.button} variant="contained">
            Begin Self-Assessment
          </Button>
        </Link>
      </div>
    </>
  );
}
