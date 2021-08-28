import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import ListIcon from "@material-ui/icons/List";
import FolderIcon from "@material-ui/icons/Folder";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

const useStyles = makeStyles({
  root: {
    alignContent: "center",
    alignItems: "center",
    maxWidth: "40%",
    padding: 18,
  },
  button: {
    marginTop: "25px",
    minWidth: "55%",
    backgroundColor: "#113516",
    color: "white",
    borderRadius: "103px",
  },
  bigButton: {
    backgroundColor: "#6E8C63",
    color: "white",
    marginTop: 50,
    borderRadius: "25px",
    minWidth: "275px",
    minHeight: "225px",
    fontSize: "18px",
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
  text: {
    marginTop: "150px",
    fontSize: "30px",
    color: "white",
  },
});

export default function Dashboard() {
  const { currentUser, setDisplayName } = useAuth();
  const nameRef = useRef();
  const userRef = firebase.firestore().collection("users");
  const [isUnknown, setUnknown] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const folderRef = useRef();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getUser() {
    console.log("getting");
    setLoading(true);
    userRef.doc(currentUser.uid).onSnapshot((doc) => {
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

  function addFolder() {
    console.log("adding folder");
    const name = folderRef.current.value;
    userRef.doc(currentUser.uid).update({
      ["articles"]: firebase.firestore.FieldValue.arrayUnion({ folder: name, stories: [] }),
    });
    handleClose();
  }

  useEffect(() => {
    getUser();
  }, []);

  if (isUnknown) {
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
          <h1 style={{ color: "white", fontFamily: "Halant", fontWeight: 600, fontSize: "40px" }}>Welcome!</h1>
          <h4 style={{ color: "white" }}>Tell us a little about yourself!</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField label="Name" variant="filled" inputRef={nameRef} />
            </div>
            <Button className={classes.button} variant="contained" type="submit">
              Enter
            </Button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 style={{ color: "white", fontFamily: "Halant", fontWeight: 600, fontSize: "72px", marginTop: "145px" }}>Welcome {currentUser.displayName}</h1>
      {user?.articles.length === 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Link to="/articles" style={{ textDecoration: "none" }}>
              <Button className={classes.bigButton} variant="contained">
                <Grid direction="column">
                  <Grid item style={{ marginBottom: "15px" }}>
                    Browse Articles
                  </Grid>
                  <FindInPageIcon style={{ fontSize: 122 }} />
                </Grid>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={2} className={classes.text}>
            Or
          </Grid>
          <Grid item xs={5}>
            <Link to="/self-assessment" style={{ textDecoration: "none" }}>
              <Button className={classes.bigButton} variant="contained">
                <Grid direction="column">
                  <Grid item style={{ marginBottom: "15px" }}>
                    Start Self-Assessment
                  </Grid>
                  <ListIcon style={{ fontSize: 122 }} />
                </Grid>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.smallButton} variant="contained" onClick={handleClickOpen}>
              Create a folder here to start saving your articles!
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>
          <h1>Saved Articles</h1>
          <Grid container spacing={3}>
            {user?.articles.map((article) => {
              return (
                <Grid item xs={2}>
                  <FolderIcon />
                  <p>{article.folder}</p>
                </Grid>
              );
            })}
            <Grid item xs={2} alignItems="center" display="flex" onClick={handleClickOpen}>
              <CreateNewFolderIcon />
              <p>Add New Folder</p>
            </Grid>
          </Grid>
        </>
      )}

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Name of New Folder</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="New Folder Name" type="email" fullWidth inputRef={folderRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addFolder} color="primary">
            Add Folder
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
