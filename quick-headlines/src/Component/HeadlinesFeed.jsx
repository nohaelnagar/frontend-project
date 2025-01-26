import React from "react";
import HeadlinesArticle from "./HeadlinesArticles";
import { Typography } from "@mui/material";
import LoadingHeadlins from "./LoadingHeadlines";


function HeadlinesFeed(props) {
  const { articles, loading } = props;
  
  if (!loading && !articles.length) {
    return (
      <Typography
        align="center"
        variant="h6"
        color="textSecondary"
        margin={4}
      >
        NO ARTICLES TO PREVIEW...
      </Typography>
    );  
  }
  
  return (
    <div>
      {loading && [...Array(5)].map((_, index) => <LoadingHeadlins key={index } />)}
      {!loading &&
        articles.map((article, index) => (
          <HeadlinesArticle key={JSON.stringify(article)} {...article} />
      ))}
    </div>
  );
}

export default HeadlinesFeed;
