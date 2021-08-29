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
    backgroundColor: "#113516",
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
});

export default function Articles() {
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [legends, setLegend] = useState([]);
  const classes = useStyles();

  const topicRef = useRef();
  const [apiValue, setApiValue] = useState("");
  const [topicValue, setTopicValue] = useState("");

  const userRef = firebase.firestore().collection("users");
  console.log(userRef);

  const [folders, setFolders] = useState();
  const [folderSave, setFolderSave] = useState();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState();

  /* 
  const [currentArticle, setCurrent] = useState();
  const [artOpen, setArtOpen] = useState();
  const [results, setResults] = useState();
  
  const folderRef = useRef();
  const { currentUser } = useAuth();

  const userRef = firebase.firestore().collection("users"); */

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
    console.log("articles");

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

  /*  function saveArticle(article) {
    console.log(folderRef.current.value);
    console.log(folders[folderRef.current.value]);
    console.log(folderRef.id);
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
    // handleClose();
  } */

  useEffect(() => {
    getUser();
    getArticles();
  }, []);

  if (loading) {
    return (
      <div display="flex" justifyContent="center" style={{ marginTop: 50 }}>
        <CircularProgress />
      </div>
    );
  }

  const handleClickOpen = (article) => {
    setOpen(true);
    setFolderSave(article);
  };

  const handleClose = () => {
    setOpen(false);
    setAlert();
  };

  /*const CloseArticle = () => {
    setArtOpen(false);
  }; */

  return (
    <>
      <h1 className={classes.appName}> willow </h1>
      <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white", marginTop: 50 }}>Search Articles</h1>
      <div display="flex" alignItems="center" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item>
            <Autocomplete
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
              renderInput={(params) => <TextField {...params} label="Search for Articles here!" variant="outlined" />}
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
                    <Grid item md={4} xs={12}>
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

          {/* {articles["results"] &&
          articles["results"].slice(0, 5).map((article) => {
            return (
              <>
                <Grid item xs={4}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Mammograms
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {article.name}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {article.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="textSecondary" className={classes.link}>
                        <a href={article.persistentUrl}>Learn More</a>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            );
          })} */}
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select the folder you would like to add this article to:</DialogTitle>
        <DialogContent>
          {folders.length > 0 && (
            <TextField select autoFocus margin="dense" id="name" label="Choose Folder to Save Article" type="email" fullWidth inputRef={folderRef} required>
              {folders.map((fold, index) => {
                return (
                  <MenuItem value={index} id={index}>
                    {fold.folder}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
          {folders.length === 0 && (
            <p>
              Add a folder first on your <Link to="/dashboard">dashboard</Link>!
            </p>
          )}
          {alert && <Alert severity="success">Success! This article was saved!</Alert>}
        </DialogContent>
      </Dialog>
      {/*  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select the folder you would like to add this article to:</DialogTitle>
        <DialogContent>
          {folders.length > 0 && (
            <TextField select autoFocus margin="dense" id="name" label="Choose Folder to Save Article" type="email" fullWidth inputRef={folderRef} required>
              {folders.map((fold, index) => {
                return (
                  <MenuItem value={index} id={index}>
                    {fold.folder}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
          {folders.length === 0 && (
            <p>
              Add a folder first on your <Link to="/dashboard">dashboard</Link>!
            </p>
          )}
          {alert && <Alert severity="success">Success! This article was saved!</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {folders.length > 0 && (
            <Button onClick={() => saveArticle(folderSave)} color="primary">
              Save Article
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {artOpen && <ArticleCard props={currentArticle} close={CloseArticle} />} */}
    </>
  );
}

/* function ArticleCard(props) {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.close();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title"> {props.props.MyHFTitle} </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.props.MyHFDescription.slice(3, props.props.MyHFDescription.length - 6)}</DialogContentText>
        {props.props.Sections.section.map((sec) => {
          return (
            <>
              <h3>{sec.Title}</h3>
              <p>
                {sec.Content.replace(/(<([^>]+)>)/gi, "")
                  .replace(/\r?\n|\r/g, " ")
                  .replace(/&nbsp;/g, " ")}
              </p>
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
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          View More
        </Button>
      </DialogActions>
    </Dialog>
  );
}
 */
