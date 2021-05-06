import React from "react";
import { useDataContext } from "../../context/data-context";
import { checkStatus } from "../../context/data-reducer";
import { WatchLaterEmpty } from "../WatchLaterEmpty";
import { WatchLaterItem } from "../WatchLaterItem";

const WatchLater = () => {
  const {
    state: { watchLater },
  } = useDataContext();

  const watchLaterActiveVideos = watchLater.filter((video) =>
    checkStatus(watchLater, video._id)
  );

  return (
    <>
      {watchLaterActiveVideos.length ? (
        <div className="watch-later-container">
          {watchLaterActiveVideos.map((item) => {
            return <WatchLaterItem key={item._id} watchLaterItem={item} />;
          })}
        </div>
      ) : (
        <WatchLaterEmpty />
      )}
    </>
  );
};

export default WatchLater;
