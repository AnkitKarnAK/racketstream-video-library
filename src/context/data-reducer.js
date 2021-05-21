export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_VIDEOS": {
      return { ...state, videos: payload };
    }

    case "SET_PLAYLISTS": {
      return { ...state, playlists: payload };
    }

    case "GET_LIKED_VIDEOS": {
      return { ...state, likedVideos: payload };
    }

    case "GET_WATCH_LATER": {
      return { ...state, watchLaterVideos: payload };
    }

    case "TOGGLE_LIKE": {
      return isAlreadyAdded(state.likedVideos, payload._id)
        ? {
            ...state,
            likedVideos: toggleStatus(state.likedVideos, payload._id),
          }
        : {
            ...state,
            likedVideos: addNewItem(state.likedVideos, {
              ...payload,
              status: { exists: true },
            }),
          };
    }

    case "TOGGLE_WATCH_LATER": {
      return isAlreadyAdded(state.watchLater, payload._id)
        ? {
            ...state,
            watchLater: toggleStatus(state.watchLater, payload._id),
          }
        : {
            ...state,
            watchLater: addNewItem(state.watchLater, {
              ...payload,
              status: { exists: true },
            }),
          };
    }

    case "CREATE_PLAYLIST": {
      payload.setInputPlayListName("");
      return {
        ...state,
        playlists: [
          ...state.playlists,
          {
            playlistId: Math.random().toString(36).substring(7),
            name: payload.inputPlayListName,
            videos: [],
          },
        ],
      };
    }
    case "DELETE_PLAYLIST": {
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist.playlistId !== payload.playlistId
        ),
      };
    }

    case "ADD_TO_PLAYLIST": {
      return {
        ...state,
        playlists: state.playlists.map((playlist) => {
          if (playlist.playlistId === payload.playlistId) {
            if (
              playlist.videos.some(
                (item) => item.videoId === payload.videoItem.videoId
              )
            ) {
              const videos = playlist.videos.filter(
                (item) => item.videoId !== payload.videoItem.videoId
              );
              return { ...playlist, videos };
            }
            return {
              ...playlist,
              videos: [...playlist.videos, { ...payload.videoItem }],
            };
          }
          return playlist;
        }),
      };
    }

    case "REMOVE_FROM_PLAYLIST": {
      return state.map((playlist) => {
        if (playlist.playlistId === payload.playlistId) {
          if (
            playlist.videos.some((item) => item.videoId === payload.videoId)
          ) {
            const videos = playlist.videos.filter(
              (item) => item.videoId !== payload.videoId
            );
            return { ...playlist, videos };
          }
          return playlist;
        }
        return playlist;
      });
    }

    default:
      return state;
  }
};

export const isAlreadyAdded2 = (itemsArray, id) => {
  if (itemsArray) {
    return itemsArray.find((item) => item.videoId._id === id);
  }
  return false;
};

export const isAlreadyAdded = (itemsArray, id) => {
  for (let itemInArray of itemsArray) {
    if (itemInArray._id === id) return true;
  }
  return false;
};

export const toggleStatus = (itemsArray, id) => {
  return itemsArray.map((item) => {
    if (item._id === id) {
      return { ...item, status: { exists: !item.status.exists } };
    } else {
      return item;
    }
  });
};

export const addNewItem = (itemsArray, item) => [
  ...itemsArray,
  { ...item, quantity: 1 },
];

export const checkStatus = (itemsArray, id) => {
  for (let itemInArray of itemsArray) {
    if (itemInArray._id === id && itemInArray.status.exists) return true;
  }
  return false;
};
