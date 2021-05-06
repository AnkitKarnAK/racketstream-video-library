import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./data-reducer";
import { v4 as uuid } from "uuid";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    playlists: [
      {
        playlistId: uuid(),
        name: "My Playlist",
        videos: [],
      },
    ],
    videos: [],
    watchLater: [],
    likedVideos: [],
  });

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
