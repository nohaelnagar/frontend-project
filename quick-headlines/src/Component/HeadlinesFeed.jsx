import React from "react";
import HeadlinesArticle from "./HeadlinesArticles";

function HeadlinesFeed(props) {
  const { articles } = props;
  return (
    <div>
      {articles.map((article, index) => (
        <HeadlinesArticle key={JSON.stringify(article)} {...article} />
      ))}
    </div>
  );
}

export default HeadlinesFeed;
