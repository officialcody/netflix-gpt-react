import React from "react";
import { LOGO_URL } from "../utils/app.constants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute px-4 py-4 w-screen z-10 flex justify-between">
      <img className="w-48" src={LOGO_URL} alt="logo" />
      {user && (
        <div className="flex">
          <p>{user.displayName}</p>
          <img src={user.photURL} alt="avatar" />
          <button
            className="bg-red-600 rounded-lg p-4 m-4 text-white font-bold tracking-widest"
            onClick={handleSignout}
          >
            Signout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
