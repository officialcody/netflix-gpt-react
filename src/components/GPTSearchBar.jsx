import React, { useRef } from "react";
import language from "../utils/language.constants";
import { useDispatch, useSelector } from "react-redux";
import genAI from "../utils/genAi";
import { API_OPTIONS } from "../utils/app.constants";
import { addGptMovieResults } from "../utils/slices/GPTSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((store) => store.uiconfig.language);
  const searchText = useRef(null);

  const searchMovieInTMDB = async (movie) => {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&language=en-US&page=1`,
      API_OPTIONS
    );
    const jsonData = await apiData.json();
    return jsonData.results;
  };

  const handleOnSearch = async (event) => {
    if (searchText.current.value === "") {
      return;
    }
    const query =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only provie 5 movie names. Comma seperated like the example result given ahead. Example: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    // Using OpenAI Chat API
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });

    // Using Google Generative AI API's
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const genAiResults = await model.generateContent(query);
    const suggestedMoviesNames = genAiResults.response.text().split(",");
    const promisesArray = suggestedMoviesNames.map((movie) =>
      searchMovieInTMDB(movie)
    );
    const data = await Promise.all(promisesArray);
    dispatch(
      addGptMovieResults({
        movieNames: suggestedMoviesNames,
        movieResults: data,
      })
    );
  };

  return (
    <div className="pt-[60%] md:pt-[20%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={language[currentLanguage].gptSearchPlaceHolder}
        />
        <button
          className="py-2 md:px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg"
          onClick={handleOnSearch}
        >
          {language[currentLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
