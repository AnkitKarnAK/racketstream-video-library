import React, { useState } from "react";
import Loader from "react-loader-spinner";

import { useAuthContext } from "../../context/auth-context";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { loginUser } = useAuthContext();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await loginUser(userEmail, userPassword);
    if (res?.status === 401 || res?.status === 500) {
      setError(res?.data?.message || "Something went wrong, please try again!");
      setLoading(false);
      return;
    }
    navigate(state?.from ? state.from : "/products");
  };

  return (
    <>
      <div className="login-container">
        <div className="h2 login-title">LOGIN</div>
        <form className="login-form" onSubmit={loginHandler}>
          <div className="input-box login-email-input">
            <input
              placeholder="Enter your email here"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              className="effect-1"
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
              }}
              className="effect-1"
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              maxLength="20"
              required
            />
            <span className="focus-border"></span>
          </div>

          <button className="button-primary login-button" type="submit">
            LOGIN
          </button>

          <div
            style={{
              display: error !== "" ? "block" : "none",
              color: "#ef4444",
            }}
          >
            {error}
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
            <Loader type="ThreeDots" color="#2874f0" height={150} width={150} />
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
