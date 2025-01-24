import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import HeadlinesHeader from "./Component/HeadlinesHeader";
import HeadlinesFeed from "./Component/HeadlinesFeed";

function App() {
  const [articles, setArticles] = useState([]);
  
  async function loadData() {
const response = await fetch(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
);

    const data = await response.json();
    return data.articles.map(article => {
      const { title, description, author, publishedAt, urlToImage } = article;
      return {
        title,
        description,
        author,
        publishedAt,
        image: urlToImage,
      }
    });
  }
  useEffect(() => {
    loadData().then(setArticles);
  }, []);
  return (
    <Container>
      <HeadlinesHeader />
      <HeadlinesFeed articles={articles} />
    </Container>
  );
}

export default App;
