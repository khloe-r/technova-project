import { Button, Grid, TextField, Typography, Switch, CircularProgress, Card, CardActions, CardContent, MenuItem, CardMedia, CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "../App.css";
import firebase from "firebase/app";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import PersonIcon from "@material-ui/icons/Person";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  leftbub: {
    color: "#fff",
    backgroundColor: "#56365F",
    marginBottom: 100,
    borderRadius: "0px 30px 30px 30px",
    marginLeft: 50,
    width: 300,
    position: "relative",
  },
  rightbub: {
    color: "#fff",
    backgroundColor: "#56365F",
    marginTop: 100,
    borderRadius: "30px 0px 30px 30px",
    marginRight: 50,
    width: 300,
    position: "relative",
  },
  button: {
    color: "#fff",
  },
  icon: {
    color: "#fff",
  },
  root: {
    minWidth: 275,
    display: "flex",
    flex: "1 0 100%",
    flexWrap: "wrap",
    backgroundColor: "#56365F",
    color: "#fff",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    backgroundColor: "#6E8C63",
    borderRadius: "103px",
    color: "white",
    textDecoration: "none",
    minWidth: "105px",
    margin: "0px 20px 0px",
  },
  media: {
    height: 200,
  },
  appName: {
    fontFamily: "Cardo",
    fontWeight: 500,
    color: "#56365F",
    letterSpacing: 2,
    fontSize: 25,
    textAlign: "left",
    margin: "40px 10px 0px",
  },
  results: {
    minWidth: "40%",
    backgroundColor: "#113516",
    color: "white",
    borderRadius: "103px",
  },
  dialog: {
    backgroundColor: "#56365F",
    color: "#fff",
  },
});

const GreenSwitch = withStyles({
  switchBase: {
    color: "#fff",
    "&$checked": {
      color: "#46633c",
    },
    "&$checked + $track": {
      backgroundColor: "#46633c",
    },
  },
  checked: {},
  track: {},
})(Switch);

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
    margin: "20px 0",
  },
})(TextField);

export default function AssessmentChat() {
  const { currentUser } = useAuth();
  const [state, setState] = React.useState({
    pregnant: false,
    tobacco: false,
    sexactive: false,
    errors: {},
  });

  const feelingRef = useRef();
  const ageRef = useRef();

  const [feelingWell, setFeelingWell] = useState();
  const [age, setAge] = useState();
  const [pregnantSet, setPregantSet] = useState();
  const [tobaccoSet, setTobaccoSet] = useState();
  const [sexActiveSet, setSexActiveSet] = useState();

  const [results, setResults] = useState();

  const classes = useStyles();
  const [loading, setLoading] = useState();
  const [folders, setFolders] = useState();
  const userRef = firebase.firestore().collection("users");

  const questions = [`Hello, ${currentUser.displayName}! How are you feeling today?`, `Let's start out with a few questions! First off, how old are you?`, `Are you currently pregnant?`, `Do you use tobacco?`, `Are you sexually active?`];

  function getUser() {
    setLoading(true);
    userRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setFolders(doc.data().articles);
      });
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  function handleOne() {
    let errors = {};
    if (!feelingRef.current.value) {
      errors.feeling = "Please describe how you are feeling";
    } else {
      setFeelingWell(true);
    }
    setState({ errors: errors });
  }
  function handleTwo() {
    let errors = {};
    if (!ageRef.current.value) {
      errors.age = "Please enter you age";
    } else {
      setAge(ageRef.current.value);
    }
    setState({ errors: errors });
  }
  function handleThree() {
    setPregantSet(true);
  }
  function handleFour() {
    setTobaccoSet(true);
  }
  function handleFive() {
    setSexActiveSet(true);
  }

  function handleSubmit() {
    setResults(true);
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleValidation = (e) => {
    let errors = {};
    let formIsValid = true;

    setState({ errors: errors });
    return formIsValid;
  };

  return (
    <>
      <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white", marginTop: 50 }}>Self - Assessment</h1>
      <p style={{ fontFamily: "Halant", fontSize: 17, fontWeight: 300, color: "white", marginBottom: 50 }}>Don't worry, this is a safe space!</p>
      <div display="flex">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={1} className={classes.icon}>
            <HeadsetMicIcon fontSize="large" />
          </Grid>
          <Grid item md={5} xs={8} className={`${classes.leftbub} sb14`}>
            <p>{questions[0]}</p>
          </Grid>

          <Grid item md={4} xs={7} className={`${classes.rightbub} sb13`}>
            <CssTextField label="I'm feeling..." variant="filled" InputProps={{ classes: { input: classes.field } }} inputRef={feelingRef} helperText={state.errors.feeling} error={state.errors.feeling ? true : false} />
            <br />
            {!feelingWell && (
              <Button className={classes.button} onClick={handleOne}>
                Send
              </Button>
            )}
          </Grid>
          <Grid item xs={1} style={{ marginTop: 100 }} className={classes.icon}>
            <PersonIcon fontSize="large" />
          </Grid>
          {feelingWell && (
            <>
              <Grid item xs={1} className={classes.icon}>
                <HeadsetMicIcon fontSize="large" />
              </Grid>
              <Grid item xs={5} className={`${classes.leftbub} sb14`}>
                <p>{questions[1]}</p>
              </Grid>

              <Grid item xs={4} className={`${classes.rightbub} sb13`}>
                <CssTextField label="My age is" variant="filled" type="number" inputRef={ageRef} helperText={state.errors.age} error={state.errors.age ? true : false} />
                <br />
                {!age && (
                  <Button className={classes.button} onClick={handleTwo}>
                    Send
                  </Button>
                )}
              </Grid>
              <Grid item xs={1} style={{ marginTop: 100 }} className={classes.icon}>
                <PersonIcon fontSize="large" />
              </Grid>
            </>
          )}
          {age && (
            <>
              <Grid item xs={1} className={classes.icon}>
                <HeadsetMicIcon fontSize="large" />
              </Grid>
              <Grid item xs={5} className={`${classes.leftbub} sb14`}>
                <p>{questions[2]}</p>
              </Grid>

              <Grid item xs={4} className={`${classes.rightbub} sb13`}>
                <Typography component="div">
                  <Grid component="label" container alignItems="center" justifyContent="center" spacing={1}>
                    <Grid item>No</Grid>
                    <Grid item>
                      <GreenSwitch name="pregnant" className={classes.switches} checked={state.pregnant} onChange={handleChange} />
                    </Grid>
                    <Grid item>Yes</Grid>
                  </Grid>
                </Typography>
                <br />
                {!pregnantSet && (
                  <Button className={classes.button} onClick={handleThree}>
                    Send
                  </Button>
                )}
              </Grid>
              <Grid item xs={1} style={{ marginTop: 100 }} className={classes.icon}>
                <PersonIcon fontSize="large" />
              </Grid>
            </>
          )}
          {pregnantSet && (
            <>
              <Grid item xs={1} className={classes.icon}>
                <HeadsetMicIcon fontSize="large" />
              </Grid>
              <Grid item xs={5} className={`${classes.leftbub} sb14`}>
                <p>{questions[3]}</p>
              </Grid>

              <Grid item xs={4} className={`${classes.rightbub} sb13`}>
                <Typography component="div">
                  <Grid component="label" container alignItems="center" justifyContent="center" spacing={1}>
                    <Grid item>No</Grid>
                    <Grid item>
                      <GreenSwitch name="tobacco" className={classes.switches} checked={state.tobacco} onChange={handleChange} />
                    </Grid>
                    <Grid item>Yes</Grid>
                  </Grid>
                </Typography>
                <br />
                {!tobaccoSet && (
                  <Button className={classes.button} onClick={handleFour}>
                    Send
                  </Button>
                )}
              </Grid>
              <Grid item xs={1} style={{ marginTop: 100 }} className={classes.icon}>
                <PersonIcon fontSize="large" />
              </Grid>
            </>
          )}
          {tobaccoSet && (
            <>
              <Grid item xs={1} className={classes.icon}>
                <HeadsetMicIcon fontSize="large" />
              </Grid>
              <Grid item xs={5} className={`${classes.leftbub} sb14`}>
                <p>{questions[4]}</p>
              </Grid>

              <Grid item xs={4} className={`${classes.rightbub} sb13`}>
                <Typography component="div">
                  <Grid component="label" container alignItems="center" justifyContent="center" spacing={1}>
                    <Grid item>No</Grid>
                    <Grid item>
                      <GreenSwitch name="sexactive" className={classes.switches} checked={state.sexactive} onChange={handleChange} />
                    </Grid>
                    <Grid item>Yes</Grid>
                  </Grid>
                </Typography>
                <br />
                {!sexActiveSet && (
                  <Button className={classes.button} onClick={handleFive}>
                    Send
                  </Button>
                )}
              </Grid>
              <Grid item xs={1} style={{ marginTop: 100 }} className={classes.icon}>
                <PersonIcon fontSize="large" />
              </Grid>
            </>
          )}
          {sexActiveSet && (
            <Grid item xs={12}>
              <Button variant="contained" className={classes.results} style={{ marginTop: 50 }} onClick={handleSubmit}>
                View Results
              </Button>
            </Grid>
          )}
        </Grid>
      </div>

      {results && (
        <>
          <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white" }}>Your Recommendations!</h1>
          <ResultsPage age={age} pregnant={state.pregnant} active={state.sexactive} tobacco={state.tobacco} folder={folders} />
        </>
      )}

      <Typography variant="body1" style={{ marginTop: 50, color: "#fff" }}>
        Powered By
        <br />
        <a href="https://health.gov/myhealthfinder" title="MyHealthfinder">
          <img src="https://health.gov/themes/custom/healthfinder/images/MyHF.svg" alt="MyHealthfinder" height={20} />
        </a>
      </Typography>
    </>
  );
}

function ResultsPage(props) {
  let previouslySaved = false;
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [currentArticle, setCurrent] = useState();
  const [artOpen, setArtOpen] = useState();
  const [results, setResults] = useState();
  const [folders, setFolders] = useState();
  const [folderSave, setFolderSave] = useState();
  const classes = useStyles();
  const folderRef = useRef();
  const { currentUser } = useAuth();

  const userRef = firebase.firestore().collection("users");

  async function getArticles() {
    setLoading(true);
    await fetch(`https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?age=${props.age}&sex=female&pregnant=${props.pregnant ? "yes" : "no"}&sexuallyActive=${props.active ? "yes" : "no"}&tobaccoUse=${props.tobacco ? "yes" : "no"}&lang=en9`)
      .then((response) => response.json())
      .then((resul) => {
        console.log(resul);
        setResults(resul);
      })
      .then(() => {
        setFolders(props.folder);
      });
    setLoading(false);

    console.log(props.folder);
  }

  function saveArticle(article) {
    if (handleValidation()) {
      const saved = folders[folderRef.current.value]["stories"];
      for (const i in saved) {
        if (article.MyHFTitle == saved[i].name || article.MyHFDescription == saved[i].description) {
          previouslySaved = true;
        }
      }

      console.log(folderRef.current.value);
      console.log(folders[folderRef.current.value]);
      console.log(folderRef.id);
      if (previouslySaved == false) {
        userRef
          .doc(currentUser.uid)
          .update({
            [`articles`]: firebase.firestore.FieldValue.arrayRemove(folders[folderRef.current.value]),
          })
          .then(() => {
            folders[folderRef.current.value]["stories"].push({
              name: article.MyHFTitle,
              description: article.MyHFDescription.slice(3, article.MyHFDescription.length - 6),
              link: article.AccessibleVersion,
              assessment: true,
            });
            userRef
              .doc(currentUser.uid)
              .update({
                [`articles`]: firebase.firestore.FieldValue.arrayUnion(folders[folderRef.current.value]),
              })
              .then(() => {
                setAlert(true);
              });
          });
      } else {
        handleClose();
      }
    }
    // handleClose();
  }

  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    errors: {},
  });

  const handleClickOpen = (resource) => {
    setOpen(true);
    setFolderSave(resource);
  };

  const handleClose = () => {
    previouslySaved = false;
    setAlert(false);
    setOpen(false);
  };

  const openArticle = (resource) => {
    setArtOpen(true);
    setCurrent(resource);
  };

  const CloseArticle = () => {
    setArtOpen(false);
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!(folderRef.current.value >= 0)) {
      formIsValid = false;
      errors.folder = "Please choose a folder";
    }
    setState({ errors: errors });
    return formIsValid;
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {!results && <CircularProgress color="#fff" />}
      <Grid container spacing={3}>
        {results &&
          results["Result"]["Resources"]["all"]["Resource"].map((resource) => {
            return (
              <>
                <Grid item xs={4}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia className={classes.media} image={resource.ImageUrl} title={resource.ImageAlt} />
                      <CardContent>
                        <br />
                        <Typography variant="h5" component="h2">
                          {resource.MyHFTitle}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="p">
                          {resource.MyHFDescription.slice(3, resource.MyHFDescription.length - 6)
                            .replace(/\r?\n|\r/g, " ")
                            .replace(/&nbsp;/g, " ")}
                        </Typography>
                      </CardContent>
                      <CardActions style={{ display: "block" }}>
                        <div>
                          <a href={resource.AccessibleVersion} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <Button size="small" color="textSecondary" className={classes.link}>
                              Visit Site
                            </Button>
                          </a>
                          <Button size="small" color="textSecondary" className={classes.link} onClick={() => openArticle(resource)}>
                            View Article
                          </Button>
                          <Button size="small" color="textSecondary" className={classes.link} onClick={() => handleClickOpen(resource)}>
                            Save
                          </Button>
                        </div>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </Grid>
              </>
            );
          })}
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.dialog} id="form-dialog-title">
          <span style={{ fontFamily: "Halant", textAlign: "center" }}>Select the folder you would like to add this article to:</span>
        </DialogTitle>
        <DialogContent>
          {props.folder.length > 0 && (
            <TextField select autoFocus margin="dense" id="name" label="Choose Folder to Save Article" type="email" fullWidth inputRef={folderRef} required helperText={state.errors.folder} error={state.errors.folder ? true : false}>
              {props.folder.map((fold, index) => {
                return (
                  <MenuItem value={index} id={index}>
                    {fold.folder}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
          {props.folder.length === 0 && (
            <p>
              Add a folder first on your <Link to="/dashboard">dashboard</Link>!
            </p>
          )}
          {alert && <Alert severity="success">Success! This article was saved!</Alert>}
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button onClick={handleClose} color="primary" style={{ color: "#fff" }}>
            Cancel
          </Button>
          {props.folder.length > 0 && (
            <Button onClick={() => saveArticle(folderSave)} color="primary" style={{ color: "#fff" }}>
              Save Article
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {artOpen && <ArticleCard props={currentArticle} close={CloseArticle} />}
    </>
  );
}

function ArticleCard(props) {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.close();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle className={classes.dialog} id="alert-dialog-title">
        <span style={{ fontFamily: "Halant", textAlign: "center" }}>{props.props.MyHFTitle}</span>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText style={{ color: "#ba9dc1" }} id="alert-dialog-description">
          {props.props.MyHFDescription.slice(3, props.props.MyHFDescription.length - 6)}
        </DialogContentText>
        {props.props.Sections.section.map((sec) => {
          return (
            <>
              <h3>{sec.Title}</h3>
              <p>
                {sec.Content.replace(/(<([^>]+)>)/gi, "")
                  .replace(/\r?\n|\r/g, " ")
                  .replace(/&nbsp;/g, " ")}
              </p>
              <hr />
            </>
          );
        })}
        <h2>Related Topics!</h2>
        <Grid container spacing={3}>
          {props.props.RelatedItems.RelatedItem.map((item) => {
            return (
              <>
                <Grid item xs={4}>
                  <h3>{item.Title}</h3>
                  <Button variant="contained" href={item.Url} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </Button>
                </Grid>
              </>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialog}>
        <Button onClick={handleClose} color="primary" style={{ color: "#fff" }}>
          Close
        </Button>
        <Button onClick={handleClose} style={{ color: "#fff" }} color="primary" autoFocus href={props.props.AccessibleVersion} target="_blank" rel="noopener noreferrer">
          View More
        </Button>
      </DialogActions>
    </Dialog>
  );
}
