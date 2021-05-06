import { Link } from "react-router-dom";
import { useDataContext } from "../context/data-context";

export const PlaylistItem = ({ playlistId, name }) => {
  const {
    state: { playlists },
    dispatch,
  } = useDataContext();

  const playlistSize = playlists.find(
    (playlist) => playlist.playlistId === playlistId
  ).videos.length;

  return (
    <div className="playlist-item">
      <Link className="playlist-title" to={`/playlists/${playlistId}`}>
        <div>{name}</div>
        {playlistSize > 0 && (
          <div className="item--video-count">
            {playlistSize} {playlistSize > 1 ? "videos" : "video"}
          </div>
        )}
      </Link>
      <div
        className="btn-delete-playlist"
        onClick={() =>
          dispatch({ type: "DELETE_PLAYLIST", payload: { playlistId } })
        }
      >
        <strong>DELETE</strong>
      </div>
    </div>
  );
};
