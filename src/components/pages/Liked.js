import React from "react";
import { useDataContext } from "../../context/data-context";
import { LikedEmpty } from "../LikedEmpty";
import { LikedItem } from "../LikedItem";

const Liked = () => {
  const {
    state: { likedVideos },
  } = useDataContext();

  return (
    <>
      {likedVideos.length ? (
        <div className="liked-conatiner">
          {likedVideos.map((item) => {
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
