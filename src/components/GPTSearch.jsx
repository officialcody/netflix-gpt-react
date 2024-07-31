import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";

const GPTSearch = () => {
  return (
    <div className="bg-mainbg h-[100vh]">
      <div className="h-[100vh] bg-backgrounddull">
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </div>
  );
};

export default GPTSearch;
