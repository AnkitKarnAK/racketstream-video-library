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
  addOrRemoveVideoOnPlaylist,
} from "../api/api-requests";

export const PlaylistVideoItem = ({ playlistVideoItem, playlistId }) => {
  const {
    state: { likedVideos, watchLaterVideos },
    dispatch,
  } = useDataContext();

  const { userId } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
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
              isAlreadyAdded2(watchLaterVideos, playlistVideoItem._id)
                ? "card-badge-top-right in-watch-later"
                : "card-badge-top-right"
            }
            onClick={() => {
              (async () => {
                setIsLoading(true);
                const { response } = await addOrRemoveVideoFromWatchLaterVideos(
                  {
                    userId,
                    videoItem: playlistVideoItem,
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
            {isAlreadyAdded2(watchLaterVideos, playlistVideoItem._id) ? (
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
                (async () => {
                  setIsLoading(true);
                  const { response } = await addOrRemoveVideoFromLikedVideos({
                    userId,
                    videoItem: playlistVideoItem,
                  });
                  dispatch({
                    type: "GET_LIKED_VIDEOS",
                    payload: response.data.likedVideo,
                  });
                  setIsLoading(false);
                })();
              }}
            >
              {isAlreadyAdded2(likedVideos, playlistVideoItem._id) ? (
                <FaThumbsUp />
              ) : (
                <FaRegThumbsUp />
              )}
            </div>
            <button
              className="button-primary"
              onClick={() => {
                (async () => {
                  setIsLoading(true);
                  const { response } = await addOrRemoveVideoOnPlaylist({
                    userId,
                    playlistId: playlistId,
                    videoId: playlistVideoItem._id,
                  });
                  dispatch({
                    type: "GET_PLAYLIST_VIDEOS",
                    payload: {
                      playlistId: playlistId,
                      videos: response.data.videos,
                    },
                  });
                  setIsLoading(false);
                })();
              }}
            >
              Remove from Playlist
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
