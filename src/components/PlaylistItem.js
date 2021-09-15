import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";
import { useDataContext } from "../context/data-context";
import Loader from "react-loader-spinner";
import { removeUserPlaylistOnServer } from "../api/api-requests";

export const PlaylistItem = ({ playlistItem }) => {
  const {
    state: { playlists },
    dispatch,
  } = useDataContext();

  const { userId } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const playlistSize = playlists.find(
    (playlist) => playlist._id === playlistItem._id
  )?.videos?.length;

  return (
    <>
      <div className="playlist-item">
        <Link className="playlist-title" to={`/playlists/${playlistItem._id}`}>
          <div>{playlistItem.name}</div>
          <div className="item--video-count">
            {playlistSize} {playlistSize > 1 ? "videos" : "video"}
          </div>
        </Link>
        <div
          className="btn-delete-playlist"
          onClick={() => {
            (async () => {
              setIsLoading(true);
              const { response } = await removeUserPlaylistOnServer({
                userId,
                playlistId: playlistItem._id,
              });

              dispatch({
                type: "GET_PLAYLISTS",
                payload: response.data.playlists,
              });
              setIsLoading(false);
            })();
          }}
        >
          <strong>DELETE</strong>
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
