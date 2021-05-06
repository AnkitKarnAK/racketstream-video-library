export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_VIDEOS": {
      return { ...state, videos: payload };
    }

    case "SET_PLAYLISTS": {
      return { ...state, playlists: payload };
    }

    case "SET_LIKED_VIDEOS": {
      return { ...state, likedVideos: payload };
    }

    case "SET_WATCH_LATER": {
      return { ...state, watchLater: payload };
    }

    case "ADD_NEW_PLAYLIST": {
      return { ...state, playlists: state.playlists.concat(payload) };
    }

    case "UPDATE_PLAYLIST": {
      return {
        ...state,
        playlists: state.playlists.map((item) =>
          item._id !== payload._id ? item : payload
        ),
      };
    }

    case "DELETE_PLAYLIST": {
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist._id !== payload
        ),
      };
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

    default:
      return state;
  }
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
