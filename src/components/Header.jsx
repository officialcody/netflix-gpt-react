import React from "react";
import { LOGO_URL } from "../utils/app.constants";

const Header = () => {
  return (
    <div className="absolute px-8 py-8 z-10">
      <img className="w-48" src={LOGO_URL} alt="logo" />
    </div>
  );
};

export default Header;
