import { NavLink } from "react-router-dom";
import { FaHome, FaThumbsUp } from "react-icons/fa";
import { RiPlayListLine } from "react-icons/ri";
import { MdVideoLibrary } from "react-icons/md";

export const FooterForMobileScreens = () => {
  return (
    <footer className="footer-nav">
      <NavLink
        end
        to="/"
        className="secondary-color"
        activeClassName="primary-color"
      >
        <div className="footer--item">
          <FaHome />
          <p>
            <small>Home</small>
          </p>
        </div>
      </NavLink>
      <NavLink
        to="/liked"
        className="secondary-color"
        activeClassName="primary-color"
      >
        <div className="footer--item">
          <FaThumbsUp />
          <p>
            <small>Liked</small>
          </p>
        </div>
      </NavLink>
      <NavLink
        to="/playlists"
        className="secondary-color"
        activeClassName="primary-color"
      >
        <div className="footer--item">
          <RiPlayListLine />
          <p>
            <small>Playlist</small>
          </p>
        </div>
      </NavLink>

      <NavLink
        to="/library"
        className="secondary-color"
        activeClassName="primary-color"
      >
        <div className="footer--item">
          <MdVideoLibrary />
          <p>
            <small>Library</small>
          </p>
        </div>
      </NavLink>
    </footer>
  );
};
