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
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error(
      "error occurred while adding or removing video from liked videos",
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
      "error occurred while adding or removing video from watch later",
      err
    );
  }
};

export const getUserPlaylistsFromServer = async ({ userId }) => {
  try {
    const res = await axios.get(
      `https://racketapi.herokuapp.com/playlists/${userId}`
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error("error occurred while retrieving user playlists", err);
  }
};

export const createUserPlaylistOnServer = async ({ userId, playlistName }) => {
  try {
    const res = await axios.post(
      `https://racketapi.herokuapp.com/playlists/${userId}`,
      {
        name: playlistName,
      }
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error("error occurred while creating user playlist", err);
  }
};

export const removeUserPlaylistOnServer = async ({ userId, playlistId }) => {
  try {
    const res = await axios.delete(
      `https://racketapi.herokuapp.com/playlists/${userId}/${playlistId}`
    );
    if (res.data.success) {
      return { response: res };
    }
  } catch (err) {
    console.error("error occurred while removing user playlist", err);
  }
};

export const getPlaylistVideosFromServer = async ({ userId, playlistId }) => {
  try {
    const res = await axios.get(
      `https://racketapi.herokuapp.com/playlists/${userId}/${playlistId}`
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error("error occurred while retrieving user playlists", err);
  }
};

export const addOrRemoveVideoOnPlaylist = async ({
  userId,
  videoId,
  playlistId,
}) => {
  try {
    const res = await axios.post(
      `https://racketapi.herokuapp.com/playlists/${userId}/${playlistId}`,
      {
        _id: videoId,
      }
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error(
      "error occurred while adding or removing video from liked videos",
      err
    );
  }
};
