import React from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

function Nav({ logOutCallBack }) {
  const logoutSubmit = () => {
    localStorage.clear();
    // setIsLogin(false);
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="brand-logo">GTree</div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Note</Link>
          </li>
          <li
            // onClick={logoutSubmit}
            onClick={logOutCallBack}
          >
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
