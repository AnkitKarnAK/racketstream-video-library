import { useDataContext } from "../../context/data-context";
import { PlaylistItem } from "../PlaylistItem";

const PlayLists = () => {
  const {
    state: { playlists },
  } = useDataContext();

  return (
    <div className="playlists--container">
      <div className="playlists--title">
        <strong>Playlists</strong>
      </div>
      {playlists.length > 0 ? (
        playlists.map((item) => (
          <PlaylistItem key={item._id} playlistItem={item} />
        ))
      ) : (
        <>
          <div className="playlists-empty">
            No playlist created yet. Create some ...
          </div>
        </>
      )}
    </div>
  );
};
export default PlayLists;
