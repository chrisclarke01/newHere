import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import Register from "./components/register"
import "./App.css";

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element = { <Dashboard/> } />
          <Route path = "/register" element = { <Register/> } />
        </Routes>
    </div>
  );
}

export default App;
