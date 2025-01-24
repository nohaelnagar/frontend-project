import React from "react";
import { Container } from "@mui/material";
import HeadlinesHeader from "./Component/HeadlinesHeader";
import HeadlinesFeed from "./Component/HeadlinesFeed";

function App() {
  const sampleArticles = [
    {
      title: "Test News 1",
      description: "This is a test news description 1.",
      image: "https://placehold.co/150",
      author: "John Doe",
      publishedAt: "2023-03-01T12:00:00Z",
    },
    {
      title: "Test News 2",
      description: "This is a test news description 2.",
      image: "https://placehold.co/150",
      author: "Jane Smith",
      publishedAt: "2023-04-01T12:00:00Z",
    },
    {
      title: "Test News 3",
      description: "This is a test news description 3.",
      image: "https://placehold.co/150",
      author: "John Doe",
      publishedAt: "2023-05-01T12:00:00Z",
    },
    {
      title: "Test News 4",
      description: "This is a test news description 4.",
      image: "https://placehold.co/150",
      author: "Jane Smith",
      publishedAt: "2023-06-01T12:00:00Z",
    },
  ];

  return (
    <Container>
      <HeadlinesHeader />
      <HeadlinesFeed articles={sampleArticles} />
    </Container>
  );
}

export default App;
