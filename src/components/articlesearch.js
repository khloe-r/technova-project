import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Card, CardActions, CardContent, Container, Typography, Button, TextField } from "@material-ui/core";
import { spacing } from "@material-ui/system";

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
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const legend = ["Mammograms", "Sexual Health"];

  async function getArticles() {
    const category = [];
    setLoading(true);
    console.log("articles");
    await fetch("https://tools.cdc.gov/api/v2/resources/media?topicid=5879")
      .then((response) => response.json())
      .then((art) => {
        category.push(art);
      });
    await fetch("https://tools.cdc.gov/api/v2/resources/media?topicid=6133")
      .then((response) => response.json())
      .then((art) => {
        category.push(art);
      });
    setArticles(category);
    setLoading(false);
  }

  useEffect(() => {
    getArticles();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className={classes.appName}> willow </h1>
      <h1 style={{ fontFamily: "Halant", fontSize: "35px", color: "white", marginTop: 50 }}>Search Articles</h1>
      <div display="flex" alignItems="center" justifyContent="center">
        <TextField style={{ width: 400, marginRight: 15, borderRadius: 10 }} id="filled-basic" label="Search for Articles here!" variant="filled" />
        <Button className={classes.button} style={{ height: 55, marginBottom: "40px" }} variant="contained">
          Search
        </Button>
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
                            {legend[index]}
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
                          <Button size="small" color="textSecondary" className={classes.link}>
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
    </>
  );
}
