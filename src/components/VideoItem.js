import React, { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "../context/data-context";
import { isAlreadyAdded2 } from "../context/data-reducer";
import { useAuthContext } from "../context/auth-context";
import Loader from "react-loader-spinner";
import {
  addOrRemoveVideoFromLikedVideos,
  addOrRemoveVideoFromWatchLaterVideos,
} from "../api/api-requests";

export const VideoItem = ({ videoItem, onOptionClick }) => {
  const {
    state: { likedVideos, watchLaterVideos },
    dispatch,
  } = useDataContext();

  const { userId, isUserLogin } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleShowModal = () => {
    if (typeof onOptionClick === "function")
      onOptionClick({
        videoItem,
        onOptionClick,
      });
  };

  return (
    <>
      <div className="card-container-horizontal">
        <div className="card-horizontal-image">
          <Link to={`/videos/${videoItem.videoId}`}>
            <img src={videoItem.image} alt={videoItem.title} />

            <div className="card-badge-bottom-right">{videoItem.duration}</div>
          </Link>
          <div
            className={
              isAlreadyAdded2(watchLaterVideos, videoItem._id)
                ? "card-badge-top-right in-watch-later"
                : "card-badge-top-right"
            }
            onClick={() => {
              isUserLogin
                ? (async () => {
                    setIsLoading(true);
                    const { response } =
                      await addOrRemoveVideoFromWatchLaterVideos({
                        userId,
                        videoItem,
                      });
                    dispatch({
                      type: "GET_WATCH_LATER",
                      payload: response.data.watchLater,
                    });
                    setIsLoading(false);
                  })()
                : navigate("/login");
            }}
          >
            {isAlreadyAdded2(watchLaterVideos, videoItem._id) ? (
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
          <Link to={`/videos/${videoItem.videoId}`}>
            <div className="h3 video-title">{videoItem.title}</div>
          </Link>
          <div className="card-content-horizontal">
            <div>
              <span className="text-color-green">
                <FaThumbsUp /> {videoItem.likes}
              </span>
              <span className="text-color-red">
                {" "}
                <FaThumbsDown /> {videoItem.dislikes}
              </span>
              <div>
                {" "}
                Views:{" "}
                <span style={{ color: "#878787" }}>{videoItem.viewCount}</span>
              </div>
            </div>
          </div>
          <div className="cart-buttons">
            <div
              className="cart-icon-button"
              onClick={() => {
                isUserLogin
                  ? (async () => {
                      setIsLoading(true);
                      const { response } =
                        await addOrRemoveVideoFromLikedVideos({
                          userId,
                          videoItem,
                        });
                      dispatch({
                        type: "GET_LIKED_VIDEOS",
                        payload: response.data.likedVideo,
                      });
                      setIsLoading(false);
                    })()
                  : navigate("/login");
              }}
            >
              {isAlreadyAdded2(likedVideos, videoItem._id) ? (
                <FaThumbsUp />
              ) : (
                <FaRegThumbsUp />
              )}
            </div>
            <button
              className="button-primary"
              onClick={() => {
                isUserLogin ? handleShowModal() : navigate("/login");
              }}
            >
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
