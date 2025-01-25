import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "@mui/material";
import HeadlinesHeader from "./Component/HeadlinesHeader";
import HeadlinesFeed from "./Component/HeadlinesFeed";
import { debounce } from "lodash";
import { styled } from "@mui/system";

const FooterButtons = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageNo = useRef(1);
  const queryValue = useRef("");

  async function loadData() {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${queryValue.current}&page=${pageNo.current}&pageSize=5&country=us&apiKey=${
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

  const getFetchHeadlines = () => {
    setLoading(true);
    loadData().then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  };


  const debouncedData = debounce(getFetchHeadlines, 500);

  useEffect(() => {
    getFetchHeadlines()
  }, []);

  const searchChange = (newQeury) => {
    pageNo.current = 1;
    queryValue.current = newQeury;
    debouncedData();
  };

  const nextClick = () => {
    pageNo.current += 1;
    getFetchHeadlines();
  };

  const previousClick = () => {
    pageNo.current -= 1;
    getFetchHeadlines();
  };

  return (
    <Container>
      <HeadlinesHeader onSearchChange={searchChange} />
      <HeadlinesFeed articles={articles} loading={loading} />
      <FooterButtons>
        <Button variant="outlined" onClick={previousClick}>Previous</Button>
        <Button variant="outlined" onClick={nextClick}>Next</Button>
      </FooterButtons>
    </Container>
  );
}

export default App;
