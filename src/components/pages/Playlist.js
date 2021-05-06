import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDataContext } from "../../context/data-context";
import { PlaylistVideoItem } from "../PlaylistVideoItem";
import Loader from "react-loader-spinner";

const Playlist = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    state,
    state: { playlists },
  } = useDataContext();

  const { playlistId } = useParams();
  const playlist = playlists.find((item) => item.playlistId === playlistId);

  useEffect(() => {
    setIsLoading(true);
    if (state.playlists[0].videos.length) {
      setIsLoading(false);
    }
  }, [state.playlists]);

  return (
    <>
      {isLoading ? (
        <div className="position-center">
          <Loader type="ThreeDots" color="#2874f0" height={150} width={150} />
        </div>
      ) : (
        <>
          <div className="playlisted-videos-conatiner">
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
              <PlaylistVideoItem
                key={videoItem.videoId}
                playlistVideoItem={videoItem}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default Playlist;
