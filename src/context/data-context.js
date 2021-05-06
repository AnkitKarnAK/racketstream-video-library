import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./data-reducer";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    playlists: [
      {
        playlistId: "12345",
        name: "My Playlist",
        videos: [
          {
            _id: "60913253dfb95614569b8930",
            title: "BASIC BADMINTON FOR BEGINNERS - PART 1 OF 3",
            videoId: "MsHMCZlcrXM",
            url: "https://www.youtube.com/watch?v=MsHMCZlcrXM",
            viewCount: 288787,
            date: "Feb 4, 2020",
            likes: 3700,
            dislikes: 130,
            channelName: "Shuttle Life",
            channelSubscribers: 255000,
            duration: "10:10",
            html: "https://www.youtube.com/embed/MsHMCZlcrXM?feature=oembed",
            image: "https://i.ytimg.com/vi/MsHMCZlcrXM/hqdefault.jpg",
          },
        ],
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
