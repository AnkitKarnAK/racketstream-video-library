import React, { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data-context";
import { isAlreadyAdded2 } from "../context/data-reducer";
import { useAuthContext } from "../context/auth-context";
import Loader from "react-loader-spinner";
import { addOrRemoveVideoFromLikedVideos } from "../api/api-requests";

export const WatchLaterItem = ({ watchLaterItem, onOptionClick }) => {
  const {
    state: { likedVideos, watchLaterVideos },
    dispatch,
  } = useDataContext();

  const { userId } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleShowModal = () => {
    if (typeof onOptionClick === "function")
      onOptionClick({
        videoItem: { watchLaterItem },
        onOptionClick,
      });
  };

  return (
    <>
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
              isAlreadyAdded2(watchLaterVideos, watchLaterItem._id)
                ? "card-badge-top-right in-watch-later"
                : "card-badge-top-right"
            }
            onClick={() => {
              dispatch({ type: "TOGGLE_WATCH_LATER", payload: watchLaterItem });
            }}
          >
            {isAlreadyAdded2(watchLaterVideos, watchLaterItem._id) ? (
              <span>
                <AiOutlineFieldTime />
              </span>
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
                (async () => {
                  setIsLoading(true);
                  const { response } = await addOrRemoveVideoFromLikedVideos({
                    userId,
                    videoItem: watchLaterItem,
                  });
                  dispatch({
                    type: "GET_LIKED_VIDEOS",
                    payload: response.data.likedVideo,
                  });
                  setIsLoading(false);
                })();
              }}
            >
              {isAlreadyAdded2(likedVideos, watchLaterItem._id) ? (
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
