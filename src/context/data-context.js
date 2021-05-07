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
          {
            _id: "609131e7dfb95614569b892e",
            title:
              "12 Basic Badminton Techniques that you MUST Know - Introduction",
            videoId: "S2-G_tbIj80",
            url: "https://www.youtube.com/watch?v=S2-G_tbIj80",
            viewCount: 620042,
            date: "Sep 29, 2019",
            likes: 9300,
            dislikes: 283,
            channelName: "BG Badminton Academy",
            channelSubscribers: 115000,
            duration: "06:38",
            html: "https://www.youtube.com/embed/S2-G_tbIj80?feature=oembed",
            image: "https://i.ytimg.com/vi/S2-G_tbIj80/hqdefault.jpg",
          },
        ],
      },
      {
        playlistId: "12346",
        name: "My Playlist 2",
        videos: [
          {
            _id: "609131e7dfb95614569b892e",
            title:
              "12 Basic Badminton Techniques that you MUST Know - Introduction",
            videoId: "S2-G_tbIj80",
            url: "https://www.youtube.com/watch?v=S2-G_tbIj80",
            viewCount: 620042,
            date: "Sep 29, 2019",
            likes: 9300,
            dislikes: 283,
            channelName: "BG Badminton Academy",
            channelSubscribers: 115000,
            duration: "06:38",
            html: "https://www.youtube.com/embed/S2-G_tbIj80?feature=oembed",
            image: "https://i.ytimg.com/vi/S2-G_tbIj80/hqdefault.jpg",
          },
        ],
      },
      {
        playlistId: "12347",
        name: "My Playlist 3",
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
