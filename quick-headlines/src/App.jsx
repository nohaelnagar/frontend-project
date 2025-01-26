import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import HeadlinesHeader from "./Component/HeadlinesHeader";
import HeadlinesFeed from "./Component/HeadlinesFeed";
import { debounce, set } from "lodash";
import { styled } from "@mui/system";

const FooterButtons = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

const PAGE_SIZE = 5;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pageNo = useRef(1);
  const queryValue = useRef("");

  async function loadData() {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${queryValue.current}&page=${pageNo.current
      }&pageSize=${PAGE_SIZE}&country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY
      }`
    );

    const data = await response.json();
    if (data.status === "error") {
      throw new Error("An Error has Occured");
    }
    return data.articles.map(article => {
      const { title, description, author, publishedAt, urlToImage } = article;
      return {
        title,
        description,
        author,
        publishedAt,
        image: urlToImage,
      };
    });
  } 



  const getFetchHeadlines = () => {
    setLoading(true);
    setError("");
    loadData().then((newData) => {
      setArticles(newData);
    }).catch(errorMessage => {
      setError(errorMessage.message);
    }).finally(() => {
      setLoading(false);
    });
  };


  const debouncedData = debounce(getFetchHeadlines, 500);
  
  useEffect(() => {
    getFetchHeadlines();
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
      {error.length === 0 ? (
        <HeadlinesFeed articles={articles} loading={loading} />
      ) : (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <FooterButtons>
        <Button
          variant="outlined"
          onClick={previousClick}
          disabled={pageNo.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={nextClick}
          disabled={articles.length < PAGE_SIZE}
        >
          Next
        </Button>
      </FooterButtons>
    </Container>
  );
}

export default App;
