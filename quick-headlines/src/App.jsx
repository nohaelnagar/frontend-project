import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import HeadlinesHeader from "./Component/HeadlinesHeader";
import HeadlinesFeed from "./Component/HeadlinesFeed";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");

  async function loadData(inputQuery) {
const response = await fetch(
  `https://newsapi.org/v2/top-headlines?q=${query}&country=us&apiKey=${
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
    loadData(query).then(setArticles);
  }, [query]);


  return (
    <Container>
      <HeadlinesHeader onSearchChange ={setQuery} />
      <HeadlinesFeed articles={articles} />
    </Container>
  );
}

export default App;
