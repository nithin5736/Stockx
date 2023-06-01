import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { apiURL } from "./utils/APIRoutes";
import Home from "./pages/Home";
import Table from "./pages/Table/Table";

function App() {
  const [user, setUser] = useState(
    null || JSON.parse(localStorage.getItem("user"))
  );

  const getUser = async () => {
    try {
      const url = `${apiURL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route
        path="/signup"
        element={user ? <Navigate to="/home" /> : <Signup />}
      />
      <Route
        path="/home"
        element={user ? <Home user={user} /> : <Navigate to="/" />}
      />
      <Route path="/table" element={<Table user={user} />} />
    </Routes>
  );
}

export default App;
