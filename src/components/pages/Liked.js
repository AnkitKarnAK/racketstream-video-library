import React from "react";
import { useDataContext } from "../../context/data-context";
import { checkStatus } from "../../context/data-reducer";
import { LikedEmpty } from "../LikedEmpty";
import { LikedItem } from "../LikedItem";

const Liked = () => {
  const {
    state: { likedVideos },
  } = useDataContext();

  const likedActiveVideos = likedVideos.filter((video) =>
    checkStatus(likedVideos, video._id)
  );

  return (
    <>
      {likedActiveVideos.length ? (
        <div className="liked-container">
          {likedActiveVideos.map((item) => {
            return <LikedItem key={item._id} likedItem={item} />;
          })}
        </div>
      ) : (
        <LikedEmpty />
      )}
    </>
  );
};

export default Liked;
