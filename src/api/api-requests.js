import axios from "axios";

export const getVideosFromServer = async ({ url, requestType }) => {
  switch (requestType) {
    case "GET": {
      const res = await axios.get(url);
      if (res.data.success) {
        return { response: res };
      }
      break;
    }
    default:
      return null;
  }
};

export const getVideoFromServer = async (url) => {
  try {
    const res = await axios.get(url);
    if (res.data.success) {
      return { response: res };
    }
  } catch (err) {
    return { response: err.res };
  }
};

export const addOrRemoveVideoFromLikedVideos = async ({
  userId,
  videoItem,
}) => {
  try {
    const res = await axios.post(
      `https://racketapi.herokuapp.com/likedvideos/${userId}`,
      {
        _id: videoItem._id,
      }
    );
    console.log(res);
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error(
      "error occured while adding or removing video from liked videos",
      err
    );
  }
};

export const addOrRemoveVideoFromWatchLaterVideos = async ({
  userId,
  videoItem,
}) => {
  try {
    const res = await axios.post(
      `https://racketapi.herokuapp.com/watchlaters/${userId}`,
      {
        _id: videoItem._id,
      }
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error(
      "error occured while adding or removing video from watch later",
      err
    );
  }
};
