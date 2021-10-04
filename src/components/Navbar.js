import { NavLink } from "react-router-dom";

import userLoginIcon from "../assests/user-login.svg";
import profileIcon from "../assests/profile-icon.svg";

import { useAuthContext } from "../context/auth-context";

export const Navbar = () => {
  const { isUserLogin } = useAuthContext();

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav-header">
          <span className="nav-header-secondary">Racket</span>
          <span className="nav-header-primary">Stream</span>
        </NavLink>
        <div className="nav-links">
          {isUserLogin ? (
            <>
              <div className="button-badge-container">
                <button className="nav-button">
                  <NavLink
                    to="/profile"
                    className="nav-icon-container"
                    activeClassName="nav-link-active"
                  >
                    <img
                      src={profileIcon}
                      alt="Profile"
                      className="nav-icons"
                    />
                    Profile
                  </NavLink>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="button-badge-container">
                <button className="nav-button">
                  <NavLink
                    to="/login"
                    className="nav-icon-container"
                    activeClassName="nav-link-active"
                  >
                    <img
                      src={userLoginIcon}
                      alt="Login"
                      className="nav-icons"
                    />
                    Login
                  </NavLink>
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
