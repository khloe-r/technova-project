import React, { useState, useEffect } from "react";

export default function Articles() {
  const [articles, setArticles] = useState();

  function getArticles() {
    console.log("articles");
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <h1>Search Articles</h1>
    </>
  );
}
