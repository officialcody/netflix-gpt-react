import React from "react";
import { TMDB_IMG_CDN } from "../utils/app.constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4 ">
      <img
        className="rounded-lg"
        alt="movie card img"
        src={TMDB_IMG_CDN + posterPath}
      />
    </div>
  );
};

export default MovieCard;
