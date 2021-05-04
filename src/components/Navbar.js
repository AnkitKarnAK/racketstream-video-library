import { Link, NavLink } from "react-router-dom";

import userLoginIcon from "../assests/user-login.svg";
import profileIcon from "../assests/profile-icon.svg";

import { useAuthContext } from "../context/auth-context";

export const Navbar = () => {
  const { isUserLogin, logoutUser } = useAuthContext();

  return (
    <>
      <nav className="nav">
        <div id="menuToggle">
          <input type="checkbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            <Link to="/">
              <li>
                <img src={profileIcon} alt="home" className="nav-icons" />
                Home
              </li>
            </Link>
            <Link to="/products">
              <li>
                <img src={profileIcon} alt="videos" className="nav-icons" />
                Videos
              </li>
            </Link>
            <Link to="/profile">
              <li>
                <img src={profileIcon} alt="profile" className="nav-icons" />
                Profile
              </li>
            </Link>
            <li className="menu-logout-container">
              {isUserLogin && (
                <button
                  onClick={logoutUser}
                  className="menu-logout-button button-primary"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
        <NavLink to="/" className="nav-header">
          <span className="nav-header-secondary">Racket</span>
          <span className="nav-header-primary">Stream</span>
        </NavLink>
        <div className="nav-links">
          <div className="button-badge-container display-toggle">
            <button className="nav-button">
              <NavLink
                to="/videos"
                className="nav-icon-container"
                activeClassName="nav-link-active"
              >
                <img src={profileIcon} alt="Videos" className="nav-icons" />
                Videos
              </NavLink>
            </button>
          </div>
          {isUserLogin ? (
            <>
              <div className="button-badge-container">
                <button className="nav-button">
                  <NavLink
                    to="/playlist"
                    className="nav-icon-container"
                    activeClassName="nav-link-active"
                  >
                    <img
                      src={profileIcon}
                      alt="Wishlist"
                      className="nav-icons"
                    />
                    Playlist
                  </NavLink>
                </button>

                <div className="icon-badge">2</div>
              </div>
              <div className="button-badge-container display-toggle">
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
              <div className="button-badge-container display-toggle-mobile">
                <button className="nav-button">
                  <NavLink
                    to="/videos"
                    className="nav-icon-container"
                    activeClassName="nav-link-active"
                  >
                    <img src={profileIcon} alt="Videos" className="nav-icons" />
                    Videos
                  </NavLink>
                </button>
              </div>
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
