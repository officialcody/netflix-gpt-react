import React from "react";
import language from "../utils/language.constants";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const currentLanguage = useSelector((store) => store.uiconfig.language);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={language[currentLanguage].gptSearchPlaceHolder}
        />
        <button className="py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg">
          {language[currentLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
