import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import Register from "./components/register"
import Login from "./components/login"
import Profile from "./components/profile"
import "./App.css";

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element = { <Dashboard/> } />
          <Route path = "/register" element = { <Register/> } />
          <Route path = "/login" element = { <Login/> } />
          <Route path = "/profile" element = { <Profile/> } />
        </Routes>
    </div>
  );
}

export default App;
