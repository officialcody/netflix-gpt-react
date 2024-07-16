import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="bg-mainbg h-[100vh]">
      <Header />
      <div className="h-[100vh] bg-background relative">
        <form className="absolute w-3/12 p-12 bg-black flex flex-col my-40 mx-auto right-0 left-0 text-white bg-opacity-85 rounded-lg">
          <h1 className="text-3xl font-bold">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700 rounded-md"
            />
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-700 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700 rounded-md"
          />
          <button className="p-4 my-4 bg-red-700 w-full rounded-lg">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 px-1" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up now"
              : "Already Registered? Sign In now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
