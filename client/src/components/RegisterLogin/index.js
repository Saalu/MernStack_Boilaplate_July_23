import React, { useState, useEffect } from "react";
import axios from "axios";

function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: user.email,
      password: user.password,
    };
    try {
      const res = await axios.post("api/users/login", payload);
      setErr(res.data.msg);

      setIsLogin(true);
      localStorage.setItem("tokenStore", res.data.user.token);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    // <div className="container">
    //   <h2>Login</h2>
    //   <div className="row">
    //     <form className="col s12" onSubmit={handleSubmit}>
    //       <div className="row">
    //         <div className="input-field col s12">
    //           <input
    //             type="text"
    //             name="email"
    //             id="email"
    //             value={user.email}
    //             onChange={handleChange}
    //             className="validate"
    //           />
    //           <label htmlFor="email">Email</label>
    //           <span
    //             className="helper-text"
    //             data-error="wrong"
    //             data-success="right"
    //           ></span>
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div className="input-field col s12">
    //           <input
    //             type="text"
    //             name="password"
    //             id="password"
    //             value={user.password}
    //             onChange={handleChange}
    //             className="validate"
    //           />
    //           <label htmlFor="password">Password</label>
    //           <span
    //             className="helper-text"
    //             data-error="Typer a right password"
    //             data-success="right"
    //           ></span>
    //         </div>
    //       </div>
    //       {/* Check Errors */}
    //       <div>{err}</div>

    //       <div className="row">
    //         <div className="col s12">
    //           <button type="submit" className="btn waves-effect red lighten-2">
    //             Login
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div>Register User</div>
  );
}

export default Login;
