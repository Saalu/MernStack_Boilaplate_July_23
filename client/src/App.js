import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Login from "./components/RegisterLogin/register";
import Protected from "./components/Protected";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");

      if (token) {
        const verified = await axios.get("/api/users/verify");

        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  });

  return (
    <div className="App">
      {isLogin ? <Protected /> : <Login setIsLogin={setIsLogin} />}
      {/* <Route path="/" element={<Home />} /> */}
    </div>
  );
}

export default App;
