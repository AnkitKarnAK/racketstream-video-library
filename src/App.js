import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";

import Error404 from "./components/pages/Error404";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />

        <PrivateRoute path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
