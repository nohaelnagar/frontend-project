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
  const [category, setCategory] = useState("general");
  const pageNo = useRef(1);
  const queryValue = useRef("");

  async function loadData(categoryNow) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${categoryNow}&q=${
        queryValue.current
      }&page=${pageNo.current}&pageSize=${PAGE_SIZE}&country=us&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );

    const data = await response.json();
    if (data.status === "error") {
      throw new Error("Something went wrong!!!");
    }
    return data.articles.map((article) => {
      const { title, description, author, publishedAt, urlToImage } = article;
      return {
        title,
        url,
        description,
        author,
        publishedAt,
        image: urlToImage,
      };
    });
  } 

  const getFetchHeadlines = (categoryNow) => {
    setLoading(true);
    setError("");
    loadData(categoryNow ?? category).then((newData) => {
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

  const categoryChanges = (event) => {
    setCategory(event.target.value);
    pageNo.current = 1;
    getFetchHeadlines(event.target.value);
  }


  return (
    <Container>

      <HeadlinesHeader
        onSearchChange={searchChange}
        category={category}
        onCategoryChange={categoryChanges}
      />

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
          disabled={loading || pageNo.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={nextClick}
          disabled={loading || articles.length < PAGE_SIZE}
        >
          Next
        </Button>
      </FooterButtons>

    </Container>
  );
}

export default App;
