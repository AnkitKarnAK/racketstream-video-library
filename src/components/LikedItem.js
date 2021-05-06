import React from "react";

import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data-context";
import { checkStatus } from "../context/data-reducer";

export const LikedItem = ({ likedItem }) => {
  const {
    state: { likedVideos },
    dispatch,
  } = useDataContext();
  return (
    <div className="card-container-horizontal">
      <div className="card-horizontal-image">
        <Link to={`/videos/${likedItem.videoId}`}>
          <img src={likedItem.image} alt={likedItem.title} />

          <div className="card-badge-bottom-right">{likedItem.duration}</div>
        </Link>
        <div className="card-badge-top-right">
          <span className="tooltiptext">Watch Later</span>
          <AiOutlineFieldTime />
        </div>
      </div>

      <div className="card-body-horizontal">
        <Link to={`/videos/${likedItem.videoId}`}>
          <div className="h3 video-title">{likedItem.title}</div>
        </Link>
        <div className="card-content-horizontal">
          <div>
            <span className="card-content-title">{likedItem.channelName}</span>
            <div> Subscibers: {likedItem.channelSubscribers}</div>
            <div>
              Views:{" "}
              <span style={{ color: "#878787" }}>{likedItem.viewCount}</span>
            </div>
          </div>
        </div>
        <div className="cart-buttons">
          <div
            className="cart-icon-button"
            onClick={() => {
              dispatch({ type: "TOGGLE_LIKE", payload: likedItem });
            }}
          >
            {checkStatus(likedVideos, likedItem._id) ? (
              <FaThumbsUp />
            ) : (
              <FaRegThumbsUp />
            )}
          </div>
          <button className="button-primary">Add to Playlist</button>
        </div>
      </div>
    </div>
  );
};
