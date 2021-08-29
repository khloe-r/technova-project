import { Button, Typography, Card, CardContent, CardActions, Grid, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect, useRef, useReducer } from "react";
import { useParams } from "react-router";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";
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
  link: {
    backgroundColor: "#6E8C63",
    borderRadius: "103px",
    color: "white",
    textDecoration: "none",
    minWidth: "120px",
    margin: "0 20px 0",
  },
  title: {
    fontSize: 14,
    fontFamily: "Halant",
    fontWeight: 300,
  },
  root: {
    minWidth: 275,
    backgroundColor: "#56365F",
    color: "white",
    borderRadius: 20,
  },
  smallButton: {
    backgroundColor: "#6E8C63",
    color: "white",
    marginTop: 50,
    borderRadius: "25px",
    minWidth: "1150px",
    minHeight: "50px",
    fontSize: "18px",
    marginBottom: "50px",
  },
});

export default function FolderView() {
  let { id } = useParams();
  const [loading, setLoading] = useState();
  const [user, setUser] = useState();
  const [wrong, setWrong] = useState();
  const { currentUser } = useAuth();
  const classes = useStyles();
  const userRef = firebase.firestore().collection("users");

  function getUser() {
    console.log("getting");
    setLoading(true);
    userRef.doc(currentUser.uid).onSnapshot((doc) => {
      if (doc.exists) {
        setUser(doc.data().articles[id]);
        if (doc.data().articles.length <= id) {
          setWrong(true);
        }
      }
    });
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <CircularProgress color="#fff" />;
  }

  if (wrong) {
    return (
      <>
        <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white", marginTop: 100 }}>Sorry that folder doesn't exist!</h1>
        <p style={{ color: "white" }}>
          Return to your
          <Link to="/dashboard">dashboard</Link>
          to add more folders!
        </p>
      </>
    );
  }

  return (
    <>
      <div>
        <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white" }}>Folder: {user?.folder}</h1>
        <Grid container spacing={3}>
          {user?.stories.map((story) => {
            return (
              <>
                <Grid item xs={4}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} color="white" gutterBottom>
                        Source: {story.assessment ? "Self-Assessment" : "Article Search"}
                      </Typography>
                      <Typography variant="h6" component="h2" style={{ marginBottom: "5px", fontFamily: "Halant", fontWeight: 600 }}>
                        {story.name}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {story.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                      <a href={story.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <Button size="small" color="textSecondary" className={classes.link}>
                          Read
                        </Button>
                      </a>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            );
          })}
        </Grid>
        <Link to="/dashboard">
          <Button className={classes.smallButton} variant="contained">
            <span style={{ textDecoration: "none" }}>Return to Dashboard!</span>
          </Button>
        </Link>
      </div>
    </>
  );
}
