import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDataContext } from "../../context/data-context";
import { PlaylistVideoItem } from "../PlaylistVideoItem";
import Loader from "react-loader-spinner";
import { getPlaylistVideosFromServer } from "../../api/api-requests";
import { useAuthContext } from "../../context/auth-context";

const Playlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuthContext();
  const { dispatch } = useDataContext();

  const {
    state: { playlists },
  } = useDataContext();

  const { playlistId } = useParams();
  const playlist = playlists.find((item) => item._id === playlistId);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { response } = await getPlaylistVideosFromServer({
          userId,
          playlistId,
        });

        dispatch({
          type: "GET_PLAYLIST_VIDEOS",
          payload: { playlistId: playlistId, videos: response.data.videos },
        });
        setIsLoading(false);
      } catch (err) {
        alert("failed to fetch playlist videos ", err);
        console.error(err);
      }
    })();
  }, [dispatch, userId, playlistId]);

  return (
    <>
      {isLoading ? (
        <div className="position-center">
          <Loader type="ThreeDots" color="#2874f0" height={150} width={150} />
        </div>
      ) : (
        <>
          <div className="playlisted-videos-container">
            <div className="playlist-bar">
              <div className="playlist-title">
                <strong>test</strong>
                {playlist?.videos.length > 0 ? (
                  <div className="playlist-video-count info__grey">
                    {playlist.videos.length}{" "}
                    {playlist.videos.length > 1 ? "videos" : "video"}
                  </div>
                ) : (
                  <div>There are no videos in this playlist yet.</div>
                )}
              </div>
            </div>

            {playlist?.videos.map((videoItem) => (
              <PlaylistVideoItem
                key={videoItem._id}
                playlistVideoItem={videoItem.videoId}
                playlistId={playlistId}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default Playlist;
