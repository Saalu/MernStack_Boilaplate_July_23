import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Register from "./components/RegisterLogin";
import Login from "./components/RegisterLogin/login";
import Protected from "./components/Protected";
import axios from "axios";
import { navigate, Router } from "@reach/router";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const token = localStorage.getItem("tokenStore");

  //     if (token) {
  //       const verified = await axios.get("/api/users/verify");

  //       setIsLogin(verified.data);
  //       if (verified.data === false) return localStorage.clear();
  //     } else {
  //       setIsLogin(false);
  //     }
  //   };
  //   checkLogin();
  // });

  return (
    <div className="App">
      {/* {isLogin ? <Home /> : <Login setIsLogin={setIsLogin} />  } */}
      <Router id="router">
        <Login path="login" setIsLogin={setIsLogin} />
        <Home path="/" />
        <Register path="register" />
        <Protected path="protected" />
      </Router>
    </div>
  );
}

export default App;
