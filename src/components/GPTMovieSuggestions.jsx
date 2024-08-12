import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) {
    return null;
  }
  return (
    <div className="p-4 m-4 bg-backgroundbright text-white">
      <div>
        {movieNames.map((movie, index) => (
          <MovieList
            key={movie + index}
            title={movie}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
