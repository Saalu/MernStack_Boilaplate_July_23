import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./RegisterLogin/login";
import Register from "./RegisterLogin";
import Protected from "./Protected";
import Nav from "./Nav";
import { Redirect } from "@reach/router";

function Home({ setIsLogin }) {
  const token = localStorage.getItem("tokenStore");
  if (!token) return <Redirect from="" to="login" noThrow />;
  return (
    <div>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}

      <h2>Home Page</h2>
      <Nav />
    </div>
  );
}

export default Home;
