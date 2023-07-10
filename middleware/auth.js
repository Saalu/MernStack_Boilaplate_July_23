const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config/key");

const auth = (req, res, next) => {
  try {
    let token = req.cookies.x_auth;

    if (!token)
      return res
        .status(400)
        .json({ isAuth: false, error: true, msg: "Invalid Authentication" });

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Authorization not valid." });

      req.user = user;
      req.token = token;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = { auth };
