import React, { useEffect } from "react";
import { LOGO_URL } from "../utils/app.constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/slices/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute px-4 py-4 w-screen z-10 flex justify-between bg-gradient-to-b from-black">
      <img className="w-48" src={LOGO_URL} alt="logo" />
      {user && (
        <div className="flex p-8">
          <span className="flex p-2">
            <p className="font-bold my-1 mx-2 text-white">{user.displayName}</p>
            <img className="w-8 h-8 mx-2" src={user.photoURL} alt="avatar" />
          </span>
          <button
            className="bg-red-600 rounded-lg p-2 text-white font-bold tracking-widest"
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
