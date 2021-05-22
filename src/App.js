import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { FooterForMobileScreens } from "./components/FooterForMobileScreens";
import { PrivateRoute } from "./components/PrivateRoute";
import { useDataContext } from "./context/data-context";
import {
  getUserPlaylistsFromServer,
  getVideosFromServer,
} from "./api/api-requests";

import Error404 from "./components/pages/Error404";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Videos from "./components/pages/Videos";
import Video from "./components/pages/Video";
import Liked from "./components/pages/Liked";
import WatchLater from "./components/pages/WatchLater";
import PlayLists from "./components/pages/Playlists";
import PlayList from "./components/pages/Playlist";
import Signup from "./components/pages/Signup";
import { useAuthContext } from "./context/auth-context";

function App() {
  const { state, dispatch } = useDataContext();
  const { isUserLogin, userId } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const { response } = await getVideosFromServer({
          url: "https://racketapi.herokuapp.com/videos",
          requestType: "GET",
        });
        dispatch({ type: "SET_VIDEOS", payload: response.data.videos });
      } catch (err) {
        alert("failed to fetch ", err);
        console.error(err);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (isUserLogin) {
      (async () => {
        try {
          const { response } = await getVideosFromServer({
            url: `https://racketapi.herokuapp.com/likedvideos/${userId}`,
            requestType: "GET",
          });

          dispatch({
            type: "GET_LIKED_VIDEOS",
            payload: response.data.likedVideo,
          });
        } catch (error) {
          console.error(error);
        }

        try {
          const { response } = await getVideosFromServer({
            url: `https://racketapi.herokuapp.com/watchlaters/${userId}`,
            requestType: "GET",
          });

          dispatch({
            type: "GET_WATCH_LATER",
            payload: response.data.watchLater,
          });
        } catch (error) {
          console.error(error);
        }

        try {
          const { response } = await getUserPlaylistsFromServer({ userId });

          dispatch({
            type: "GET_PLAYLISTS",
            payload: response.data.playlists,
          });
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [isUserLogin, dispatch, userId]);

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <FooterForMobileScreens />
      <Routes>
        <Route path="/" element={<Videos />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:videoId" element={<Video />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error404 />} />
        <PrivateRoute path="/liked" element={<Liked />} />
        <PrivateRoute path="/watch-later" element={<WatchLater />} />
        <PrivateRoute path="/playlists" element={<PlayLists />} />
        <PrivateRoute path="/playlists/:playlistId" element={<PlayList />} />

        <PrivateRoute path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
