import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import HeadlinesHeader from "./Component/HeadlinesHeader";
import HeadlinesFeed from "./Component/HeadlinesFeed";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData(inputQuery) {
const response = await fetch(
  `https://newsapi.org/v2/top-headlines?q=${inputQuery}&country=us&apiKey=${
    import.meta.env.VITE_NEWS_API_KEY
  }`
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
    setLoading(true);
    loadData("").then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  }, []);

  const handleSearchChange = (newQeury) => {
    setLoading(true);
    loadData(newQeury).then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  };

  return (
    <Container>
      <HeadlinesHeader onSearchChange={handleSearchChange} />
      <HeadlinesFeed articles={articles} loading={loading} />
    </Container>
  );
}

export default App;
