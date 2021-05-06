import React from "react";
import { FaRegThumbsUp, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data-context";
import { checkStatus } from "../context/data-reducer";

export const VideoItem = ({ videoItem, onOptionClick }) => {
  const {
    state: { likedVideos, watchLater },
    dispatch,
  } = useDataContext();

  const handleShowModal = () => {
    if (typeof onOptionClick === "function")
      onOptionClick({
        videoItem,
        onOptionClick,
      });
  };

  return (
    <div className="card-container-horizontal">
      <div className="card-horizontal-image">
        <Link to={`/videos/${videoItem.videoId}`}>
          <img src={videoItem.image} alt={videoItem.title} />

          <div className="card-badge-bottom-right">{videoItem.duration}</div>
        </Link>
        <div
          className={
            checkStatus(watchLater, videoItem._id)
              ? "card-badge-top-right in-watch-later"
              : "card-badge-top-right"
          }
          onClick={() => {
            dispatch({ type: "TOGGLE_WATCH_LATER", payload: videoItem });
          }}
        >
          {checkStatus(watchLater, videoItem._id) ? (
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
              dispatch({ type: "TOGGLE_LIKE", payload: videoItem });
            }}
          >
            {checkStatus(likedVideos, videoItem._id) ? (
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
  );
};
