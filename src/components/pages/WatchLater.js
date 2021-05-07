import React, { useState } from "react";
import { useDataContext } from "../../context/data-context";
import { checkStatus } from "../../context/data-reducer";
import { WatchLaterEmpty } from "../WatchLaterEmpty";
import { WatchLaterItem } from "../WatchLaterItem";
import { useModal } from "../../context/modal-context";
import { SaveVideoModal } from "../SaveVideoModal";

const WatchLater = () => {
  const {
    state: { watchLater },
  } = useDataContext();

  const watchLaterActiveVideos = watchLater.filter((video) =>
    checkStatus(watchLater, video._id)
  );

  const [modalData, setModalData] = useState({});
  const { isModalVisible, setModalVisibility } = useModal();

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setModalVisibility(true);
  };

  return (
    <>
      {watchLaterActiveVideos.length ? (
        <div className="watch-later-container">
          {isModalVisible && <SaveVideoModal {...modalData} />}
          {watchLaterActiveVideos.map((item) => {
            return (
              <WatchLaterItem
                key={item._id}
                watchLaterItem={item}
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
