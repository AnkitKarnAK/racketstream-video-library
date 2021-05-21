import React, { useState } from "react";
import { useDataContext } from "../../context/data-context";
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
  console.log(likedVideos);
  return (
    <>
      {likedVideos?.length ? (
        <div className="liked-container">
          {isModalVisible && <SaveVideoModal {...modalData} />}
          {likedVideos.map((item) => {
            return (
              <LikedItem
                key={item._id}
                likedItem={item.videoId}
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
