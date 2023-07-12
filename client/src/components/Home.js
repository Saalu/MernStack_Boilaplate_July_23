import React, { useEffect } from "react";
import Login from "./RegisterLogin/login";
import Register from "./RegisterLogin";
import Protected from "./Protected";
import Nav from "./Nav";
import { Redirect } from "@reach/router";
import { UserContext } from "../App";

function Home({ logOutCallBack }) {
  const token = localStorage.getItem("tokenStore");
  if (!token) return <Redirect from="" to="login" noThrow />;

  return (
    <div>
      <Nav logOutCallBack={logOutCallBack} />
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">User Name</span>
                <p>User Email</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
