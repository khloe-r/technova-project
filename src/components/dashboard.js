import React, { useState, useEffect, useRef } from "react";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext.js";
import { Grid, TextField, Button } from "@material-ui/core";

export default function Dashboard() {
  const { currentUser, setDisplayName } = useAuth();
  const nameRef = useRef();
  const userRef = firebase.firestore().collection("users");
  const [isUnknown, setUnknown] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  function getUser() {
    console.log("getting");
    setLoading(true);
    userRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUnknown(false);
          setUser(doc.data());
        } else {
          setUnknown(true);
        }
      });
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    userRef
      .doc(currentUser.uid)
      .set({
        name: nameRef.current.value,
        articles: [],
        symptoms: [],
      })
      .then(() => {
        setDisplayName(nameRef.current.value);
        setUnknown(false);
      });
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (isUnknown) {
    return (
      <>
        <h1>Welcome!</h1>
        <h4>Tell us a little about yourself!</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField label="Name:" variant="filled" inputRef={nameRef} />
          </div>
          <Button variant="contained" type="submit">
            Enter
          </Button>
        </form>
      </>
    );
  }

  return (
    <>
      <h1>{currentUser.displayName}'s Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item>
          <Button variant="contained">Browse Articles</Button>
        </Grid>

        <Grid item>
          <Button variant="contained">Start Self-Assessment</Button>
        </Grid>
      </Grid>
    </>
  );
}
