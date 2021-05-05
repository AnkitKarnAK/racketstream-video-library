import { FaRegThumbsUp, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { RiPlayListLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { getVideoFromServer } from "../../api/api-requests";

const VideoItem = () => {
  const [video, setVideo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { videoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { response } = await getVideoFromServer(
        `https://racketapi.herokuapp.com/videos/${videoId}`
      );
      if (response?.data.success) {
        setIsLoading(false);
        setVideo(response.data.video);
      } else {
        navigate("/error404");
        setIsLoading(false);
      }
    })();
    return () => {
      setVideo({});
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="position-center">
          <Loader type="ThreeDots" color="#2874f0" height={150} width={150} />
        </div>
      ) : (
        <div className="video">
          <div className="video-container">
            <iframe
              src={video.html}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-details">
            <p className="title-large">{video.title}</p>
            <small>{video.viewCount} views</small>
            <div className="savebar">
              <div className="savebar-item">
                <FaThumbsUp />
                <div>Like</div>
              </div>
              <div className="savebar-item">
                <RiPlayListLine />
                <div>Save</div>
              </div>
            </div>
            <div className="channel-description">
              <div className="title">
                {video.channelName}
                <div className="title-content">
                  {video.channelSubscribers} subcribers
                </div>
              </div>
            </div>
            <div className="description">Published on {video.date}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default VideoItem;
