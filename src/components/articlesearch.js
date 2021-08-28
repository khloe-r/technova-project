import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Card, CardActions, CardContent, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    color: "textSecondary",
    textDecoration: "none",
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
      <h1>Search Articles</h1>
      {articles && console.log(articles)}
      <Grid container spacing={4}>
        {articles &&
          articles.map((art, index) => {
            return art["results"].slice(0, 5).map((article) => {
              return (
                <>
                  <Grid item xs={4}>
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          {legend[index]}
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
    </>
  );
}
