import React, { useRef, useState } from "react";
import Header from "./Header";
import {
  checkLoginValidations,
  checkSignupValidations,
} from "../utils/validate";
import { auth } from "../utils/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/slices/UserSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const location = useLocation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const resetErrorMessageFields = () => {
    setNameErrorMessage("");
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setConfirmPasswordErrorMessage("");
  };

  const toggleSignInForm = () => {
    resetErrorMessageFields();
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClicked = (event) => {
    // Validate Login/Signup Data
    const errorMessages = isSignInForm
      ? checkLoginValidations(emailRef.current.value, passwordRef.current.value)
      : checkSignupValidations(
          nameRef.current.value,
          emailRef.current.value,
          passwordRef.current.value,
          confirmPasswordRef.current.value
        );

    // Populate Error Messages to UI
    populateErrorMessages(errorMessages);

    // Signup Logic
    if (!isSignInForm) {
      // If there is any error in form data
      if (
        errorMessages.nameError !== "" ||
        errorMessages.emailError !== "" ||
        errorMessages.passwordError !== "" ||
        errorMessages.confirmPasswordError !== ""
      ) {
        return;
      }

      // Signup
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/33709657?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/browse");
            })
            .catch((error) => {
              navigate("/error");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setEmailErrorMessage(errorCode, " ", errorMessage);
        });
    } else {
      // If there is any error in form data
      if (
        errorMessages.passwordError !== "" ||
        errorMessages.emailError !== ""
      ) {
        return;
      }

      // Signin
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, " ", errorMessage);
        });
    }
  };

  const populateErrorMessages = (errorMessages) => {
    const { nameError, emailError, passwordError, confirmPasswordError } =
      errorMessages;
    setNameErrorMessage(nameError);
    setEmailErrorMessage(emailError);
    setPasswordErrorMessage(passwordError);
    setConfirmPasswordErrorMessage(confirmPasswordError);
  };

  if (user) {
    return <Navigate to="/browse" state={{ from: location }} replace />;
  }

  return (
    <div className="bg-mainbg h-[100vh]">
      <Header />
      <div className="h-[100vh] bg-background relative">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="absolute p-12 max-w-96 bg-black flex flex-col mx-auto my-48 right-0 left-0 text-white bg-opacity-85 rounded-lg"
        >
          <h1 className="text-3xl font-bold">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <>
              <input
                ref={nameRef}
                type="text"
                placeholder="Full Name"
                className="p-4 my-4 w-full bg-gray-700 rounded-md"
                onChange={() => setNameErrorMessage("")}
              />
              {nameErrorMessage && nameErrorMessage.length > 0 && (
                <p className="text-sm text-red-500 px-2">{nameErrorMessage}</p>
              )}
            </>
          )}
          <input
            ref={emailRef}
            type="text"
            placeholder="Email Address"
            className={
              emailErrorMessage && emailErrorMessage.length > 0
                ? "p-4 my-4 w-full bg-gray-700 rounded-md border-2 border-red-500"
                : "p-4 my-4 w-full bg-gray-700 rounded-md"
            }
            onChange={() => setEmailErrorMessage("")}
          />
          {emailErrorMessage && emailErrorMessage.length > 0 && (
            <p className="text-sm text-red-500 px-2">{emailErrorMessage}</p>
          )}
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className={
              passwordErrorMessage && passwordErrorMessage.length > 0
                ? "p-4 my-4 w-full bg-gray-700 rounded-md border-2 border-red-500"
                : "p-4 my-4 w-full bg-gray-700 rounded-md"
            }
            onChange={() => setPasswordErrorMessage("")}
          />
          {passwordErrorMessage && passwordErrorMessage.length > 0 && (
            <p className="text-sm text-red-500 px-2">{passwordErrorMessage}</p>
          )}
          {!isSignInForm && (
            <>
              <input
                ref={confirmPasswordRef}
                type="password"
                placeholder="Confirm Password"
                className="p-4 my-4 w-full bg-gray-700 rounded-md"
                onChange={() => setConfirmPasswordErrorMessage("")}
              />
              {confirmPasswordErrorMessage &&
                confirmPasswordErrorMessage.length > 0 && (
                  <p className="text-sm text-red-500 px-2">
                    {confirmPasswordErrorMessage}
                  </p>
                )}
            </>
          )}
          <button
            className="p-4 my-4 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClicked}
          >
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
