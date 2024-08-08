import React, { useRef } from "react";
import language from "../utils/language.constants";
import { useSelector } from "react-redux";
import openai from "../utils/openai";
import genAI from "../utils/genAi";

const GPTSearchBar = () => {
  const currentLanguage = useSelector((store) => store.uiconfig.language);
  const searchText = useRef(null);
  const handleOnSearch = async (event) => {
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
    console.log(genAiResults.response.text());
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={language[currentLanguage].gptSearchPlaceHolder}
        />
        <button
          className="py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg"
          onClick={handleOnSearch}
        >
          {language[currentLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
