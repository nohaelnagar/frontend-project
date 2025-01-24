import React from "react";
import HeadlinesArticle from "./HeadlinesArticles";
import { Typography } from "@mui/material";

function HeadlinesFeed(props) {
  const { articles, loading } = props;

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  
  if (!article.length) {
    <Typography
      align="center"
      variant="h6"
      color="textSecondary"
      margin={4}
    >
      NO ARTICLES TO PREVIEW...
    </Typography>
  }
  
  return (
    <div>
      {articles.map((article, index) => (
        <HeadlinesArticle key={JSON.stringify(article)} {...article} />
      ))}
    </div>
  );
}

export default HeadlinesFeed;
