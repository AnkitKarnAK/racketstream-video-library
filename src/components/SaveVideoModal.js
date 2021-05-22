import { useState } from "react";
import {
  addOrRemoveVideoOnPlaylist,
  createUserPlaylistOnServer,
} from "../api/api-requests";
import { useAuthContext } from "../context/auth-context";
import { useDataContext } from "../context/data-context";
import { useModal } from "../context/modal-context";
import Loader from "react-loader-spinner";

export const SaveVideoModal = ({ videoItem }) => {
  const { isModalVisible, setModalVisibility } = useModal();
  const [inputPlayListName, setInputPlayListName] = useState("");
  const {
    state: { playlists },
    dispatch,
  } = useDataContext();

  const { userId } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className={isModalVisible ? "modal-overlay show" : "hide"}></div>
      <div className={isModalVisible ? "modal show" : "hide"}>
        <div className="close-button-container">
          <div className="modal--items pb-0">
            <strong>Save to playlist</strong>
          </div>
          <div className="modal--items">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-box">
                <input
                  value={inputPlayListName}
                  onChange={(e) => setInputPlayListName(e.target.value)}
                  className="search-box effect-1"
                  type="text"
                  placeholder="Playlist name"
                />
                <span className="focus-border"></span>
              </div>
              <button
                className="button-primary modal-button"
                disabled={inputPlayListName === "" ? true : false}
                onClick={() => {
                  (async () => {
                    setIsLoading(true);
                    const { response } = await createUserPlaylistOnServer({
                      userId,
                      playlistName: inputPlayListName,
                    });
                    dispatch({
                      type: "GET_PLAYLISTS",
                      payload: response.data.playlists,
                    });
                    setIsLoading(false);
                  })();
                }}
              >
                Create
              </button>
            </form>
          </div>
          <div className="playlist-names">
            {playlists.map(({ _id, name, videos }) => (
              <div key={_id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => {
                      (async () => {
                        setIsLoading(true);
                        console.log(videoItem);
                        const { response } = await addOrRemoveVideoOnPlaylist({
                          userId,
                          playlistId: _id,
                          videoId: videoItem._id,
                        });
                        dispatch({
                          type: "GET_PLAYLIST_VIDEOS",
                          payload: {
                            playlistId: _id,
                            videos: response.data.videos,
                          },
                        });
                        setIsLoading(false);
                      })();
                    }}
                    checked={videos.some(
                      (item) => item.videoId._id === videoItem._id
                    )}
                  />
                  <span>{name}</span>
                </label>
              </div>
            ))}
          </div>

          <div
            onClick={() => setModalVisibility(false)}
            className="modal--items modal-close"
          >
            Close
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
