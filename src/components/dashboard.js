import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import ListIcon from "@material-ui/icons/List";
import FolderIcon from "@material-ui/icons/Folder";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import { InsertDriveFileTwoTone } from "@material-ui/icons";

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
  dialog: {
    backgroundColor: "#56365F",
    color: "#fff",
    textAlign: "center",
  },
});

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#56365F",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    color: "#56365F",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
})(TextField);

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
    const thename = nameRef.current.value;
    userRef
      .doc(currentUser.uid)
      .set({
        name: thename,
        articles: [],
        symptoms: {},
      })
      .then(() => {
        setDisplayName(thename);
        setLoading(true);
      });
    setUnknown(false);
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
          <h1 style={{ color: "white", fontFamily: "Halant", fontWeight: 600, fontSize: "35px" }}>Welcome!</h1>
          <h4 style={{ color: "white" }}>Tell us a little about yourself!</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField label="Name" variant="standard" inputRef={nameRef} />
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
      <h1 style={{ color: "white", fontFamily: "Halant", fontWeight: 600, fontSize: "72px", marginTop: "145px" }}>Welcome {currentUser.displayName}!</h1>
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
        <div style={{ backgroundColor: "#56365F" }}>
          <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white", paddingTop: 50 }}>Saved Articles</h1>
          <Grid container spacing={3} style={{ paddingBottom: 50 }}>
            {user?.articles.map((article, index) => {
              return (
                // <Link to={`/my-folder/${index}`}>
                <Grid item xs={2} component={Link} to={`/my-folder/${index}`}>
                  <FolderIcon style={{ color: "#917db2" }} />
                  <p style={{ color: "#fff", textDecoration: "none" }}>{article.folder}</p>
                </Grid>
                // </Link>
              );
            })}
            <Grid item xs={2} alignItems="center" display="flex" onClick={handleClickOpen}>
              <CreateNewFolderIcon style={{ color: "#917db2" }} />
              <p style={{ color: "#fff" }}>Add New Folder</p>
            </Grid>
          </Grid>
        </div>
      )}

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ borderRadius: 10 }}>
        <DialogTitle className={classes.dialog} id="form-dialog-title">
          <span style={{ fontFamily: "Halant", fontSize: 30 }}>Enter Name of New Folder</span>
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <div display="flex" justifyContent="center" backgroundColor="#fff" padding="0px 20px">
            <CssTextField autoFocus margin="dense" id="name" variant="filled" label="New Folder Name" type="text" style={{ backgroundColor: "#fff" }} inputRef={folderRef} />
          </div>
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button onClick={handleClose} color="primary">
            <span style={{ color: "#fff" }}>Cancel</span>
          </Button>
          <Button onClick={addFolder} color="primary">
            <span style={{ color: "#fff" }}>Add Folder</span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
