import React from "react";

import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data-context";
import { checkStatus } from "../context/data-reducer";

export const PlaylistVideoItem = ({ playlistVideoItem }) => {
  const {
    state: { likedVideos, watchLater },
    dispatch,
  } = useDataContext();
  return (
    <div className="card-container-horizontal">
      <div className="card-horizontal-image">
        <Link to={`/videos/${playlistVideoItem.videoId}`}>
          <img src={playlistVideoItem.image} alt={playlistVideoItem.title} />

          <div className="card-badge-bottom-right">
            {playlistVideoItem.duration}
          </div>
        </Link>
        <div
          className={
            checkStatus(watchLater, playlistVideoItem._id)
              ? "card-badge-top-right in-watch-later"
              : "card-badge-top-right"
          }
          onClick={() => {
            dispatch({
              type: "TOGGLE_WATCH_LATER",
              payload: playlistVideoItem,
            });
          }}
        >
          {checkStatus(watchLater, playlistVideoItem._id) ? (
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
        <Link to={`/videos/${playlistVideoItem.videoId}`}>
          <div className="h3 video-title">{playlistVideoItem.title}</div>
        </Link>
        <div className="card-content-horizontal">
          <div>
            <span className="card-content-title">
              {playlistVideoItem.channelName}
            </span>
            <div> Subscibers: {playlistVideoItem.channelSubscribers}</div>
            <div>
              Views:{" "}
              <span style={{ color: "#878787" }}>
                {playlistVideoItem.viewCount}
              </span>
            </div>
          </div>
        </div>
        <div className="cart-buttons">
          <div
            className="cart-icon-button"
            onClick={() => {
              dispatch({ type: "TOGGLE_LIKE", payload: playlistVideoItem });
            }}
          >
            {checkStatus(likedVideos, playlistVideoItem._id) ? (
              <FaThumbsUp />
            ) : (
              <FaRegThumbsUp />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
