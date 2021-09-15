import { NavLink } from "react-router-dom";
import { FaHome, FaThumbsUp } from "react-icons/fa";
import { RiPlayListLine } from "react-icons/ri";
import { AiOutlineFieldTime } from "react-icons/ai";
import { MdVideoLibrary } from "react-icons/md";

export const Sidebar = () => {
  return (
    <div className="sidebar-nav">
      <ul className="links-container">
        <NavLink
          end
          to="/"
          className="secondary-color"
          activeClassName="primary-color"
        >
          <li>
            <FaHome />
            <span className="link-name">Home</span>
          </li>
        </NavLink>
        <NavLink
          to="/liked"
          className="secondary-color"
          activeClassName="primary-color"
        >
          <li>
            <FaThumbsUp />
            <span className="link-name">Liked Videos</span>
          </li>
        </NavLink>
        <NavLink
          to="/watch-later"
          className="secondary-color"
          activeClassName="primary-color"
        >
          <li>
            <AiOutlineFieldTime />
            <span className="link-name">Watch Later</span>
          </li>
        </NavLink>
        <NavLink
          to="/playlists"
          className="secondary-color"
          activeClassName="primary-color"
        >
          <li>
            <RiPlayListLine />
            <span className="link-name">Playlists</span>
          </li>
        </NavLink>
        <NavLink
          to="/library"
          className="secondary-color"
          activeClassName="primary-color"
        >
          <li>
            <MdVideoLibrary />
            <span className="link-name">Library</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};
