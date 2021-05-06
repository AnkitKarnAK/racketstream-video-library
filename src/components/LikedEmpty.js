import React from "react";
import { Link } from "react-router-dom";
import emptyLiked from "../assests/empty-liked.svg";

export function LikedEmpty() {
  return (
    <div className="empty-container">
      <div className="empty-image-container">
        <img src={emptyLiked} alt="No Liked Videos" />
      </div>
      <div className="empty-content-head">No liked videos !! </div>
      <div className="empty-content-text">add your favourite videos </div>
      <Link to="/videos">
        <button className="button-primary">Watch Videos </button>
      </Link>
    </div>
  );
}
