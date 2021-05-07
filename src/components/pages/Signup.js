import React, { useState } from "react";
import Loader from "react-loader-spinner";

import { useAuthContext } from "../../context/auth-context";
import { Link, Navigate } from "react-router-dom";

const Signup = () => {
  const { signupNewUser, isUserLogin } = useAuthContext();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [serverError, setServerError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");
    setEmailError("");
    setPasswordError("");
    const res = await signupNewUser(userEmail, userPassword, userName);
    if (res?.status === 409) {
      setServerError(
        res?.data?.message || "Something went wrong, please try again!"
      );
      setLoading(false);
      return;
    } else {
      setServerError(
        res?.data?.errorMessage || "Something went wrong, please try again!"
      );
      setLoading(false);
    }
  };

  const emailValidator = () => {
    if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)) {
      setEmailError("");
    } else {
      setEmailError("• Not a vaild email");
    }
  };

  const passwordValidator = () => {
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/.test(userPassword)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "• Your password must be have at least\n8 characters long\n 1 uppercase & 1 lowercase character\n 1 number"
      );
    }
  };

  return (
    <>
      {isUserLogin ? (
        <Navigate to="/profile" replace />
      ) : (
        <div className="login-container">
          <div className="h2 login-title">SIGNUP</div>
          <form className="login-form" onSubmit={signupHandler}>
            <div className="input-box login-email-input">
              <input
                placeholder="Enter your name here"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="effect-1 no-success-valid"
                type="text"
                minLength="2"
                maxLength="30"
                required
              />
              <span className="focus-border"></span>
            </div>
            <div className="input-box signup-email-input">
              <input
                placeholder="Enter your email here"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  emailValidator();
                }}
                className="effect-1 no-success-valid"
                type="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                maxLength="50"
                required
              />
              <span className="focus-border"></span>
            </div>

            <div className="input-box login-password-input">
              <input
                placeholder="Enter your password here"
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                  passwordValidator();
                }}
                className="effect-1 no-success-valid"
                type="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                maxLength="20"
                required
              />
              <span className="focus-border"></span>
            </div>

            <button className="button-primary login-button" type="submit">
              SIGNUP
            </button>

            <div
              style={{
                display: emailError !== "" ? "block" : "none",
                color: "#ef4444",
              }}
            >
              {emailError}
            </div>
            <div
              style={{
                display: passwordError !== "" ? "block" : "none",
                color: "#ef4444",
              }}
            >
              {passwordError}
            </div>
            <div
              style={{
                display: serverError !== "" ? "block" : "none",
                color: "#ef4444",
              }}
            >
              {serverError}
            </div>

            <div className="login-other-link-text">
              Forgot your password?{" "}
              <Link to="/forgot" className="login-other-link">
                Reset here
              </Link>
            </div>
            <div className="login-other-link-text">
              Not a user yet?{" "}
              <Link
                to="/signup"
                className="login-other-link"
                // state={{ from: state?.from ? state.from : "/" }}
              >
                Create your account
              </Link>
            </div>
          </form>
          {isLoading && (
            <div className="position-center">
              <Loader
                type="ThreeDots"
                color="#2874f0"
                height={150}
                width={150}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Signup;
