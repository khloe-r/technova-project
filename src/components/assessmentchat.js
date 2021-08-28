import { Button, Grid, TextField, Typography, Switch, Card, CardActions, CardContent, CardMedia, CardActionArea } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "../App.css";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import PersonIcon from "@material-ui/icons/Person";

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
  field: {
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
    color: "textSecondary",
    textDecoration: "none",
    minWidth: "120px",
    margin: "0 20px 0",
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
      color: "white",
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
    color: "white",
  },
})(TextField);

export default function AssessmentChat() {
  const { currentUser } = useAuth();
  const [state, setState] = React.useState({
    pregnant: false,
    tobacco: false,
    sexactive: false,
  });

  const ageRef = useRef();

  const [feelingWell, setFeelingWell] = useState();
  const [age, setAge] = useState();
  const [pregnantSet, setPregantSet] = useState();
  const [tobaccoSet, setTobaccoSet] = useState();
  const [sexActiveSet, setSexActiveSet] = useState();

  const [results, setResults] = useState();

  const classes = useStyles();
  const questions = [`Hello, ${currentUser.displayName}! How are you feeling today?`, `Let's start out with a few questions! First off, how old are you?`, `Are you currently pregnant?`, `Do you use tobacco?`, `Are you sexually active?`];

  function handleOne() {
    setFeelingWell(true);
  }
  function handleTwo() {
    setAge(ageRef.current.value);
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

  return (
    <>
      <h1 className={classes.appName}> willow </h1>
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
            <CssTextField label="I'm feeling..." variant="filled" InputProps={{ classes: { input: classes.field } }} />
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
                <TextField label="My age is" variant="filled" type="number" inputRef={ageRef} />
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
              <Button variant="contained" style={{ marginTop: 50 }} onClick={handleSubmit}>
                View Results
              </Button>
            </Grid>
          )}
        </Grid>
      </div>

      {results && (
        <>
          <h1>Your Recommendations!</h1>
          <ResultsPage age={age} pregnant={state.pregnant} active={state.sexactive} tobacco={state.tobacco} />
        </>
      )}

      <Typography variant="body1" style={{ marginTop: 50 }}>
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
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const classes = useStyles();

  async function getArticles() {
    setLoading(true);
    console.log(`https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?age=${props.age}&sex=female&pregnant=${props.pregnant ? "yes" : "no"}&sexuallyActive=${props.active ? "yes" : "no"}&tobaccoUse=${props.tobacco ? "yes" : "no"}9`);
    await fetch(`https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?age=${props.age}&sex=female&pregnant=${props.pregnant ? "yes" : "no"}&sexuallyActive=${props.active ? "yes" : "no"}&tobaccoUse=${props.tobacco ? "yes" : "no"}&lang=en9`)
      .then((response) => response.json())
      .then((resul) => {
        console.log(resul);
        setResults(resul);
      });
    setLoading(false);
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {!results && <h1>Loading...</h1>}
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
                          {resource.MyHFDescription.slice(3, resource.MyHFDescription.length - 6)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <a href={resource.AccessibleVersion} target="_blank" rel="noopener noreferrer">
                          <Button size="small" color="textSecondary" className={classes.link}>
                            Visit Site
                          </Button>
                        </a>
                        <Button size="small" color="textSecondary" className={classes.link}>
                          View Article
                        </Button>
                        <Button size="small" color="textSecondary" className={classes.link}>
                          Save
                        </Button>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </Grid>
              </>
            );
          })}
      </Grid>
    </>
  );
}
