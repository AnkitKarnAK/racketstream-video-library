import React, { useEffect, useState } from "react";
import { useDataContext } from "../../context/data-context";
import { VideoItem } from "../VideoItem";
import Loader from "react-loader-spinner";

const Videos = () => {
  const { state } = useDataContext();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!state.videos.length) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [state]);
  return (
    <div>
      <div className="h2 text-center">Total Videos: {state.videos.length}</div>
      {isLoading ? (
        <div className="position-center">
          <Loader type="ThreeDots" color="#2874f0" height={150} width={150} />
        </div>
      ) : (
        <div className="videos-container">
          {state.videos.map((item) => {
            return <VideoItem key={item._id} videoItem={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Videos;
