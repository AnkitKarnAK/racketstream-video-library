import React, { useState } from "react";
import { useDataContext } from "../../context/data-context";
import { WatchLaterEmpty } from "../WatchLaterEmpty";
import { WatchLaterItem } from "../WatchLaterItem";
import { useModal } from "../../context/modal-context";
import { SaveVideoModal } from "../SaveVideoModal";

const WatchLater = () => {
  const {
    state: { watchLaterVideos },
  } = useDataContext();

  const [modalData, setModalData] = useState({});
  const { isModalVisible, setModalVisibility } = useModal();

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setModalVisibility(true);
  };

  return (
    <>
      {watchLaterVideos?.length ? (
        <div className="watch-later-container">
          {isModalVisible && <SaveVideoModal {...modalData} />}
          {watchLaterVideos.map((item) => {
            return (
              <WatchLaterItem
                key={item._id}
                watchLaterItem={item.videoId}
                onOptionClick={handleOptionClick}
              />
            );
          })}
        </div>
      ) : (
        <WatchLaterEmpty />
      )}
    </>
  );
};

export default WatchLater;
