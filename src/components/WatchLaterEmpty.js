import React from "react";
import { Link } from "react-router-dom";
import emptyWatchLater from "../assests/empty-watch-later.svg";

export function WatchLaterEmpty() {
  return (
    <div className="empty-container">
      <div className="empty-image-container">
        <img src={emptyWatchLater} alt="empty watch later videos" />
      </div>
      <div className="empty-content-head">No pending videos to watch!! </div>
      <div className="empty-content-text">add some videos for later</div>
      <Link to="/videos">
        <button className="button-primary">Go to Videos </button>
      </Link>
    </div>
  );
}
