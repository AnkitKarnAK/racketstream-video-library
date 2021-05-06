import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDataContext } from "../../context/data-context";
import { VideoItem } from "../VideoItem";
import Loader from "react-loader-spinner";

const Playlist = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { playlists },
    dispatch,
  } = useDataContext();

  const { playlistId } = useParams();
  const playlist = playlists.find((item) => item.playlistId === playlistId);

  return (
    <>
      {isLoading ? (
        <div className="position-center">
          <Loader type="ThreeDots" color="#2874f0" height={150} width={150} />
        </div>
      ) : (
        <>
          <div className="playlisted-videos-conatiner">
            <div className="playlist-details">
              <div className="playlist-title">
                <strong>{playlist.name}</strong>
              </div>
              {playlist.videos.length > 0 ? (
                <div className="playlist-video-count info__grey">
                  <small>
                    {playlist.videos.length}{" "}
                    {playlist.videos.length > 1 ? "videos" : "video"}
                  </small>
                </div>
              ) : (
                <div>There are no videos in this playlist yet.</div>
              )}
            </div>
            <div className="playlist-bar">
              <div className="playlist-title">
                <strong>{playlist.name}</strong>
                {playlist.videos.length > 0 ? (
                  <div className="playlist-video-count info__grey">
                    {playlist.videos.length}{" "}
                    {playlist.videos.length > 1 ? "videos" : "video"}
                  </div>
                ) : (
                  <div>There are no videos in this playlist yet.</div>
                )}
              </div>
            </div>

            {playlist.videos.map((videoItem) => (
              <VideoItem key={videoItem.videoId} videoItem={videoItem} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default Playlist;
