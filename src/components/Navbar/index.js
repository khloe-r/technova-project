import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { useAuth } from "../../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Button } from "@material-ui/core";

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
    <AppBar>
      {currentUser ? (
        <nav>
          <Link to="/dashboard">Home</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/symptom-tracker">Symptom Tracker</Link>
          <Link to="/self-assessment">Self-Assessment</Link>
          <Link to="/my-account">My Account</Link>
          <Link onClick={handleLogout}>Log Out</Link>
        </nav>
      ) : (
        <Link to="/"></Link>
      )}
    </AppBar>
  );
}
export default Navbar;
