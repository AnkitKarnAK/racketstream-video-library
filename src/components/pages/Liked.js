import React, { useState } from "react";
import { useDataContext } from "../../context/data-context";
import { checkStatus } from "../../context/data-reducer";
import { LikedEmpty } from "../LikedEmpty";
import { LikedItem } from "../LikedItem";
import { useModal } from "../../context/modal-context";
import { SaveVideoModal } from "../SaveVideoModal";

const Liked = () => {
  const {
    state: { likedVideos },
  } = useDataContext();

  const [modalData, setModalData] = useState({});
  const { isModalVisible, setModalVisibility } = useModal();

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setModalVisibility(true);
  };

  const likedActiveVideos = likedVideos.filter((video) =>
    checkStatus(likedVideos, video._id)
  );

  return (
    <>
      {likedActiveVideos.length ? (
        <div className="liked-container">
          {isModalVisible && <SaveVideoModal {...modalData} />}
          {likedActiveVideos.map((item) => {
            return (
              <LikedItem
                key={item._id}
                likedItem={item}
                onOptionClick={handleOptionClick}
              />
            );
          })}
        </div>
      ) : (
        <LikedEmpty />
      )}
    </>
  );
};

export default Liked;
