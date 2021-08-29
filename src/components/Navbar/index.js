import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { useAuth } from "../../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Button, ButtonGroup, Grid } from "@material-ui/core";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const authenticated = false;
  const history = useHistory();

  function authStateListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        authenticated = true;
      }
    });
  }

  async function handleLogout(e) {
    e.preventDefault();
    console.log("logging in");

    try {
      setLoading(true);
      await logout();
      history.push("/login");
    } catch {
      console.log("error");
    }
  }

  return (
    // <AppBar>
    <>
      {currentUser ? (
        <div style={{ margin: "10px 20px 0px 20px" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={2} component={Link} to="/dashboard" style={{ textDecoration: "none" }}>
              <h1 style={{ fontFamily: "Cardo", fontWeight: 500, color: "#56365F", letterSpacing: 2, fontSize: 35, textAlign: "left" }}> willow </h1>
            </Grid>
            <Grid item xs={10} style={{ justifyContent: "flex-end", display: "flex" }}>
              <ButtonGroup style={{ backgroundColor: "#46633C", color: "#fff", padding: "0px 5px", borderRadius: 25 }} variant="text" aria-label="outlined primary button group">
                <Button>
                  <Link to="/dashboard" style={{ color: "#B9E9A9", textDecoration: "none", padding: 10 }}>
                    Home
                  </Link>
                </Button>
                <Button>
                  <Link to="/articles" style={{ color: "#B9E9A9", textDecoration: "none" }}>
                    Articles
                  </Link>
                </Button>
                <Button>
                  <Link to="/symptom-tracker" style={{ color: "#B9E9A9", textDecoration: "none" }}>
                    Symptom Tracker
                  </Link>
                </Button>
                <Button>
                  <Link to="/self-assessment" style={{ color: "#B9E9A9", textDecoration: "none" }}>
                    Self Assessment
                  </Link>
                </Button>
                <Button>
                  <Link to="/my-account" style={{ color: "#B9E9A9", textDecoration: "none" }}>
                    My Account
                  </Link>
                </Button>
                <Button onClick={handleLogout} style={{ color: "#B9E9A9", textDecoration: "none" }}>
                  Log Out
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Link to="/"></Link>
      )}
    </>
    // </AppBar>
  );
}
export default Navbar;
