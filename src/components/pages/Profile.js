import React from "react";
import { useAuthContext } from "../../context/auth-context";
import profilePicIcon from "../../assests/profile-round-border-icon.svg";
import { Link } from "react-router-dom";

const Profile = () => {
  const { username, logoutUser } = useAuthContext();
  return (
    <div className="profile-container">
      <h1>Profile page</h1>
      <div className="profile-user-info">
        <img className="avatar" src={profilePicIcon} alt="Profile" />{" "}
        <span className="profile-user-name">{username}</span>
      </div>
      <div className="profile-links">
        <Link to="/playlists">Playlists</Link>
        <Link to="/likes">Liked Videos</Link>
      </div>
      <div className="profile-logout-container">
        <button
          onClick={logoutUser}
          className="button-primary profile-logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
