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
