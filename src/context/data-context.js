import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./data-reducer";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    playlists: [],
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
