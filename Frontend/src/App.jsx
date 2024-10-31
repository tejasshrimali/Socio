import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegisterUser from "../Pages/RegisterUser";
import LoginUser from "../Pages/LoginUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import CreatePost from "../Pages/CreatePost";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<RegisterUser />}></Route>
        <Route path="/login" element={<LoginUser />}></Route>
        <Route path="/createPost" element={<CreatePost />}></Route>
      </Routes>

      {/* <LoginUser /> */}
    </BrowserRouter>
  );
}

export default App;
