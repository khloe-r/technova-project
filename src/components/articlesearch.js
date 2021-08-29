import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";
import { Grid, CircularProgress, Card, CardActions, CardContent, Container, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, MenuItem } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";

const topicOptions = [
  { topicId: "5223", topic: "Aboriginal Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5223" },
  { topicId: "5235", topic: "Adolescent Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5235" },
  { topicId: "5236", topic: "Adult Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5236" },
  { topicId: "5237", topic: "Adult Vaccinations", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5237" },
  { topicId: "5250", topic: "Alcohol", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5250" },
  { topicId: "5252", topic: "Alcohol Screening and Brief Intervention", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5252" },
  { topicId: "5257", topic: "American Disabilities Act - ADA", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5257" },
  { topicId: "5287", topic: "Assisted Reproductive Technology (ART)", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5287" },
  { topicId: "5312", topic: "Birth Control", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5312" },
  { topicId: "5329", topic: "Body Image", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5329" },
  { topicId: "5338", topic: "Breast and Ovarian Cancer and Family Health History", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5338" },
  { topicId: "5340", topic: "Breast Cancer Screening", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5340" },
  { topicId: "5342", topic: "Breastfeeding", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5342" },
  { topicId: "5363", topic: "Cancer Screening", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5363" },
  { topicId: "5373", topic: "Cardiovascular Disease", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5373" },
  { topicId: "5468", topic: "Condom Effectiveness", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5468" },
  { topicId: "5476", topic: "Contraception", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5476" },
  { topicId: "5525", topic: "Disabilities and Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5525" },
  { topicId: "5547", topic: "Eating Disorders", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5547" },
  { topicId: "6380", topic: "Exercise", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6380" },
  { topicId: "5717", topic: "Health and Wellness", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5717" },
  { topicId: "5725", topic: "Health Equity", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5725" },
  { topicId: "5738", topic: "Healthcare access", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5738" },
  { topicId: "5746", topic: "Healthy Eating", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5746" },
  { topicId: "5765", topic: "Heart Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5765" },
  { topicId: "5788", topic: "HIV Prevention", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5788" },
  { topicId: "5862", topic: "Lesbian, Gay, Bisexual, and Transgender (LGBT) Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5862" },
  { topicId: "5999", topic: "Pap Tests", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=5999" },
  { topicId: "6024", topic: "Physical Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6024" },
  { topicId: "6095", topic: "Reproductive Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6095" },
  { topicId: "6133", topic: "Sexual Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6133" },
  { topicId: "6154", topic: "Smoking and Women", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6154" },
  { topicId: "10953", topic: "STD Prevention (Sexually Transmitted Disease)", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=10953" },
  { topicId: "6181", topic: "Stress & Coping", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6181" },
  { topicId: "6185", topic: "Student health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6185" },
  { topicId: "6210", topic: "Teen health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6210" },
  { topicId: "6319", topic: "Women's Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6319" },
  { topicId: "6327", topic: "Youth Health", api: "https://tools.cdc.gov/api/v2/resources/media?topicids=6327" },
];

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#56365F",
    color: "white",
    padding: "20px 0px 20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    fontFamily: "Halant",
    fontWeight: 300,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    backgroundColor: "#6E8C63",
    borderRadius: "103px",
    color: "white",
    textDecoration: "none",
    minWidth: "120px",
    margin: "0 20px 0",
  },
  button: {
    padding: "10px 30px",
    backgroundColor: "#102018",
    color: "white",
    borderRadius: "103px",
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
  autcomplete: {
    backgroundColor: "#102018",
  },
  textLabel: {
    color: "white",
  },
  textInput: {
    "& .MuiInputBase-root": {
      color: "white",
      height: 60,
    },
  },
  dialog: {
    backgroundColor: "#56365F",
    color: "#fff",
    textAlign: "center",
  },
});

export default function Articles() {
  const { currentUser } = useAuth();
  const [state, setState] = React.useState({
    errors: {},
  });
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [legends, setLegend] = useState([]);
  const classes = useStyles();

  const topicRef = useRef();
  const [apiValue, setApiValue] = useState("");
  const [topicValue, setTopicValue] = useState("");

  const userRef = firebase.firestore().collection("users");

  const [folders, setFolders] = useState([]);
  const [folderSave, setFolderSave] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState();
  let previouslySaved = false;

  const folderRef = useRef();

  function getUser() {
    console.log("getting user info");
    setLoading(true);
    userRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setFolders(doc.data().articles);
      });
    setLoading(false);
  }

  async function getArticles() {
    const category = [];
    setLoading(true);

    if (apiValue) {
      setLegend([topicValue]);
      await fetch(apiValue)
        .then((response) => response.json())
        .then((art) => {
          category.push(art);
        });
    } else {
      setLegend(["Mammograms", "Sexual Health"]);
      await fetch("https://tools.cdc.gov/api/v2/resources/media?topicid=5879")
        .then((response) => response.json())
        .then((art) => {
          category.push(art);
        });
      await fetch("https://tools.cdc.gov/api/v2/resources/media?topicid=28")
        .then((response) => response.json())
        .then((art) => {
          category.push(art);
        });
    }
    setArticles(category);
    setLoading(false);
  }

  function saveArticle(article) {
    if (handleValidation()) {
      const saved = folders[folderRef.current.value]["stories"];
      for (const i in saved) {
        if (article.name == saved[i].name || article.description == saved[i].description) {
          previouslySaved = true;
        }
      }
      if (previouslySaved == false) {
        console.log("saved");
        userRef
          .doc(currentUser.uid)
          .update({
            [`articles`]: firebase.firestore.FieldValue.arrayRemove(folders[folderRef.current.value]),
          })
          .then(() => {
            folders[folderRef.current.value]["stories"].push({
              name: article.name,
              description: article.description,
              link: article.persistentUrl,
              assessment: false,
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
      }
      setTimeout(function () {
        handleClose();
      }, 1000);
    }
  }

  useEffect(() => {
    getUser();
    getArticles();
  }, []);

  if (loading) {
    return (
      <div display="flex" justifyContent="center" style={{ marginTop: 50 }}>
        <CircularProgress color="#fff" />
      </div>
    );
  }

  const handleClickOpen = (article) => {
    setOpen(true);
    setFolderSave(article);
  };

  const handleClose = () => {
    setAlert(false);
    previouslySaved = false;
    setOpen(false);
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!folderRef.current.value) {
      formIsValid = false;
      errors.folder = "Please choose a folder";
    }
    setState({ errors: errors });
    return formIsValid;
  };

  return (
    <>
      <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white", marginTop: 50 }}>Search Articles</h1>
      <div display="flex" alignItems="center" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item>
            <Autocomplete
              className={classes.autcomplete}
              style={{ width: 400, marginRight: 15, borderRadius: 10 }}
              options={topicOptions}
              autoHighlight
              getOptionLabel={(option) => option.topic}
              onChange={(event, values, reason) => {
                if (reason !== "clear") {
                  setApiValue(values.api);
                  setTopicValue(values.topic);
                }
              }}
              inputRef={topicRef}
              renderOption={(option) => <React.Fragment>{option.topic}</React.Fragment>}
              renderInput={(params) => <TextField {...params} className={classes.textInput} InputLabelProps={{ className: classes.textLabel }} label="Search for Articles here!" variant="outlined" />}
            />
          </Grid>
          <Button
            onClick={async () => {
              await getArticles();
            }}
            className={classes.button}
            style={{ height: 55, marginBottom: "40px" }}
            variant="contained"
          >
            Search
          </Button>
        </Grid>
      </div>

      <Container maxWidth="lg">
        {articles && console.log(articles)}
        <Grid container spacing={4} justifyContent="center">
          {articles &&
            articles.map((art, index) => {
              return art["results"].slice(0, 5).map((article) => {
                return (
                  <>
                    <Grid item md={8} xs={12}>
                      <Card className={classes.root}>
                        <CardContent>
                          <Typography className={classes.title} color="white" gutterBottom>
                            {legends[index]}
                          </Typography>
                          <Typography variant="h6" component="h2" style={{ marginBottom: "5px", fontFamily: "Halant", fontWeight: 600 }}>
                            {article.name}
                          </Typography>
                          <Typography variant="body2" component="p">
                            {article.description}
                          </Typography>
                        </CardContent>
                        <CardActions style={{ justifyContent: "center" }}>
                          <a href={article.persistentUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <Button size="small" color="textSecondary" className={classes.link}>
                              Learn More
                            </Button>
                          </a>
                          <Button size="small" color="textSecondary" className={classes.link} onClick={() => handleClickOpen(article)}>
                            Save
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </>
                );
              });
            })}
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.dialog} id="form-dialog-title">
          <span style={{ fontFamily: "Halant" }}>Select the folder you would like to add this article to:</span>
        </DialogTitle>
        <DialogContent>
          {folders.length === 0 && (
            <p>
              Add a folder first on your <Link to="/dashboard">dashboard</Link>!
            </p>
          )}
          {folders.length > 0 && (
            <TextField select autoFocus margin="dense" id="name" label="Choose Folder to Save Article" type="email" fullWidth inputRef={folderRef} required helperText={state.errors.folder} error={state.errors.folder ? true : false}>
              {folders.map((fold, index) => {
                return (
                  <MenuItem value={index} id={index}>
                    {fold.folder}
                  </MenuItem>
                );
              })}
            </TextField>
          )}

          {alert && <Alert severity="success">Success! This article was saved!</Alert>}
          {previouslySaved && <Alert severity="warning">This article has already been saved in folder!</Alert>}
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button onClick={handleClose} color="primary" style={{ color: "#fff" }}>
            Cancel
          </Button>
          {folders.length > 0 && (
            <Button onClick={() => saveArticle(folderSave)} style={{ color: "#fff" }} color="primary">
              Save Article
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
