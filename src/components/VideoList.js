import React from "react";
import { FaRegThumbsUp, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Link } from "react-router-dom";

export const VideoItem = ({ videoItem }) => {
  return (
    <div className="card-container-horizontal">
      <div className="card-horizontal-image">
        <Link to={`/videos/${videoItem.videoId}`}>
          <img src={videoItem.image} alt={videoItem.title} />

          <div className="card-badge-bottom-right">{videoItem.duration}</div>
        </Link>
        <div className="card-badge-top-right">
          <span className="tooltiptext">Watch Later</span>
          <AiOutlineFieldTime />
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
          <div className="cart-icon-button">
            <FaRegThumbsUp />
          </div>
          <button className="button-primary">Add to Playlist</button>
        </div>
      </div>
    </div>
  );
};
