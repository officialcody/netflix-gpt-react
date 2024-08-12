import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/app.constants";
import { addNowPlayingMovies } from "../utils/slices/MoviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addNowPlayingMovies(jsonData.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
