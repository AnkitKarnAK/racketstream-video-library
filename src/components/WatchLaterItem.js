import React from "react";

import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data-context";
import { checkStatus } from "../context/data-reducer";

export const WatchLaterItem = ({ watchLaterItem }) => {
  const {
    state: { likedVideos, watchLater },
    dispatch,
  } = useDataContext();
  return (
    <div className="card-container-horizontal">
      <div className="card-horizontal-image">
        <Link to={`/videos/${watchLaterItem.videoId}`}>
          <img src={watchLaterItem.image} alt={watchLaterItem.title} />

          <div className="card-badge-bottom-right">
            {watchLaterItem.duration}
          </div>
        </Link>
        <div
          className={
            checkStatus(watchLater, watchLaterItem._id)
              ? "card-badge-top-right in-watch-later"
              : "card-badge-top-right"
          }
          onClick={() => {
            dispatch({ type: "TOGGLE_WATCH_LATER", payload: watchLaterItem });
          }}
        >
          {checkStatus(watchLater, watchLaterItem._id) ? (
            <>
              <AiOutlineFieldTime />
            </>
          ) : (
            <>
              <span className="tooltiptext">Watch Later</span>
              <BiTimeFive />
            </>
          )}
        </div>
      </div>

      <div className="card-body-horizontal">
        <Link to={`/videos/${watchLaterItem.videoId}`}>
          <div className="h3 video-title">{watchLaterItem.title}</div>
        </Link>
        <div className="card-content-horizontal">
          <div>
            <span className="card-content-title">
              {watchLaterItem.channelName}
            </span>
            <div> Subscibers: {watchLaterItem.channelSubscribers}</div>
            <div>
              Views:{" "}
              <span style={{ color: "#878787" }}>
                {watchLaterItem.viewCount}
              </span>
            </div>
          </div>
        </div>
        <div className="cart-buttons">
          <div
            className="cart-icon-button"
            onClick={() => {
              dispatch({ type: "TOGGLE_LIKE", payload: watchLaterItem });
            }}
          >
            {checkStatus(likedVideos, watchLaterItem._id) ? (
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
