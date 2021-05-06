import { useState } from "react";
import { useDataContext } from "../context/data-context";
import { useModal } from "../context/modal-context";

export const SaveVideoModal = ({ videoItem }) => {
  const { isModalVisible, setModalVisibility } = useModal();
  const [inputPlayListName, setInputPlayListName] = useState("");
  const {
    state: { playlists },
  } = useDataContext();

  return (
    <>
      <div
        className={isModalVisible === "show" ? "modal-overlay show" : "hide"}
      ></div>
      <div className={isModalVisible === "show" ? "modal show" : "hide"}>
        <div className="close-button-container">
          <div className="modal--items">Save to Watch later</div>
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
              >
                Create
              </button>
            </form>
          </div>
          <div className="playlist-names">
            {playlists.map(({ playlistId, name, videos }) => (
              <div key={playlistId}>
                <label>
                  <input
                    type="checkbox"
                    checked={videos.some(
                      (item) => item.videoId === videoItem.videoId
                    )}
                  />
                  <span>{name}</span>
                </label>
              </div>
            ))}
          </div>

          <div
            onClick={() => setModalVisibility("hide")}
            className="modal--items modal-close"
          >
            Close
          </div>
        </div>
      </div>
    </>
  );
};
