import React from "react";
import { FaRegThumbsUp, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";

export const VideoItem = ({ videoItem }) => {
  return (
    <div className="card-container-horizontal">
      <div className="card-horizontal-image">
        <img src={videoItem.image} alt={videoItem.title} />
        <div className="card-badge-bottom-right">{videoItem.duration}</div>
        <div className="card-badge-top-right">
          <span class="tooltiptext">Watch Later</span>
          <AiOutlineFieldTime />
        </div>
      </div>

      <div className="card-body-horizontal">
        <div className="h3 video-title">{videoItem.title}</div>
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
