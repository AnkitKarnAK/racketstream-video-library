import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { FooterForMobileScreens } from "./components/FooterForMobileScreens";
import { PrivateRoute } from "./components/PrivateRoute";
import { useDataContext } from "./context/data-context";
import { getVideosFromServer } from "./api/api-requests";

import Error404 from "./components/pages/Error404";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Videos from "./components/pages/Videos";
import VideoItem from "./components/pages/Video";
import Liked from "./components/pages/Liked";
import WatchLater from "./components/pages/WatchLater";

function App() {
  const { dispatch } = useDataContext();
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

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <FooterForMobileScreens />
      <Routes>
        <Route path="/" element={<Videos />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:videoId" element={<VideoItem />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />

        <PrivateRoute path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
