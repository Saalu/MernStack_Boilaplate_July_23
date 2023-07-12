import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Register from "./components/RegisterLogin";
import Login from "./components/RegisterLogin/login";
import Protected from "./components/Protected";
import axios from "axios";
import { navigate, Router } from "@reach/router";

export const UserContext = React.createContext([]);
function App() {
  const [userInfo, setuserInfo] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [err, setErr] = useState("");

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
  const logOutCallBack = async () => {
    try {
      await axios.get("/api/users/logout");

      localStorage.clear();

      navigate("/");
    } catch (error) {
      setErr(error.response.data);
      console.log(error.message);
    }
  };

  return (
    <UserContext.Provider value={[userInfo, setuserInfo]}>
      <div className="App">
        {/* {isLogin ? <Home /> : <Login setIsLogin={setIsLogin} />  } */}
        <Router id="router">
          <Login path="login" setIsLogin={setIsLogin} />
          <Home path="/" logOutCallBack={logOutCallBack} />
          <Register path="register" />
          <Protected path="protected" />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
