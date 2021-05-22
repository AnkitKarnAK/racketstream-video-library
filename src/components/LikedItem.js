import React, { useState } from "react";

import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data-context";
import { isAlreadyAdded2 } from "../context/data-reducer";
import { useAuthContext } from "../context/auth-context";
import Loader from "react-loader-spinner";
import {
  addOrRemoveVideoFromLikedVideos,
  addOrRemoveVideoFromWatchLaterVideos,
} from "../api/api-requests";

export const LikedItem = ({ likedItem, onOptionClick }) => {
  const {
    state: { likedVideos, watchLaterVideos },
    dispatch,
  } = useDataContext();

  const { userId } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleShowModal = () => {
    if (typeof onOptionClick === "function")
      onOptionClick({
        videoItem: likedItem,
        onOptionClick,
      });
  };

  return (
    <>
      <div className="card-container-horizontal">
        <div className="card-horizontal-image">
          <Link to={`/videos/${likedItem.videoId}`}>
            <img src={likedItem.image} alt={likedItem.title} />

            <div className="card-badge-bottom-right">{likedItem.duration}</div>
          </Link>
          <div
            className={
              isAlreadyAdded2(watchLaterVideos, likedItem._id)
                ? "card-badge-top-right in-watch-later"
                : "card-badge-top-right"
            }
            onClick={() => {
              (async () => {
                setIsLoading(true);
                const { response } = await addOrRemoveVideoFromWatchLaterVideos(
                  {
                    userId,
                    videoItem: likedItem,
                  }
                );
                dispatch({
                  type: "GET_WATCH_LATER",
                  payload: response.data.watchLater,
                });
                setIsLoading(false);
              })();
            }}
          >
            {isAlreadyAdded2(watchLaterVideos, likedItem._id) ? (
              <>
                <AiOutlineFieldTime />
              </>
            ) : (
              <>
                <span className="tool-tip-text">Watch Later</span>
                <BiTimeFive />
              </>
            )}
          </div>
        </div>

        <div className="card-body-horizontal">
          <Link to={`/videos/${likedItem.videoId}`}>
            <div className="h3 video-title">{likedItem.title}</div>
          </Link>
          <div className="card-content-horizontal">
            <div>
              <span className="card-content-title">
                {likedItem.channelName}
              </span>
              <div> Subscribers: {likedItem.channelSubscribers}</div>
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
                (async () => {
                  setIsLoading(true);
                  const { response } = await addOrRemoveVideoFromLikedVideos({
                    userId,
                    videoItem: likedItem,
                  });
                  dispatch({
                    type: "GET_LIKED_VIDEOS",
                    payload: response.data.likedVideo,
                  });
                  setIsLoading(false);
                })();
              }}
            >
              {isAlreadyAdded2(likedVideos, likedItem._id) ? (
                <FaThumbsUp />
              ) : (
                <FaRegThumbsUp />
              )}
            </div>
            <button className="button-primary" onClick={handleShowModal}>
              Add to Playlist
            </button>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="position-bottom-left">
          <Loader type="Oval" color="#2874f0" height={50} width={50} />
        </div>
      )}
    </>
  );
};
