import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(
    localStorage?.getItem("login") || false
  );
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));
    loginStatus?.isUserLoggedIn && setIsUserLogin(true);
    loginStatus?.username && setUsername(loginStatus.username);
    loginStatus?.userId && setUserId(loginStatus.userId);
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "https://racketapi.onrender.com/users/login",
        {
          email: email.toLowerCase(),
          password: password,
        }
      );

      if (response.status === 200) {
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLoggedIn: true,
            username: response.data.user.name,
            userId: response.data.user._id,
          })
        );

        setIsUserLogin(true);
        setUsername(response.data.user.name);
        setUserId(response.data.user._id);

        // localStorage?.setItem("userData", JSON.stringify(data.user));
      }
    } catch (err) {
      return err.response;
    }
  };

  const logoutUser = () => {
    localStorage?.removeItem("login");
    setIsUserLogin(false);
    navigate("/videos");
  };

  const signupNewUser = async (email, password, name) => {
    try {
      const response = await axios.post(
        "https://racketapi.onrender.com/users",
        {
          name: name,
          email: email.toLowerCase(),
          password: password,
        }
      );

      if (response.status === 201) {
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLoggedIn: true,
            username: response.data.user.name,
            userId: response.data.user._id,
          })
        );

        setIsUserLogin(true);
        setUsername(response.data.user.name);
        setUserId(response.data.user._id);
      }
    } catch (err) {
      console.error(err.response);
      return err.response;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLogin,
        loginUser,
        logoutUser,
        signupNewUser,
        username,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
