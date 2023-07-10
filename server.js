// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { hash, compare } = require("bcrypt");
const { verify, sign } = require("jsonwebtoken");
const { auth } = require("./middleware/auth");
// =========Imports============
const User = require("./models/userModel");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//==================================== Routes=========================================================
app.get("/", (req, res) => {
  res.send("Welcome to Solid Mern Boilaplate");
});

// ==================Get Token Auth=========
app.get("/api/users/auth", auth, async (req, res) => {
  // res.json(req.user);
  res.json({
    _id: req.user.id,
    isAuth: true,
    name: req.user.name,
  });
  //   lastname: req.user.lastname,
  //   email: req.user.email,
  //   role: req.user.role,
});

// ==================Register User====================
app.post("/api/users/register", async (req, res) => {
  try {
    // const user = new User(req.body);
    const { username, lastname, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) return res.status(401).json({ msg: "User already exist" });

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      username,
      lastname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ success: true, data: newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// =========================Login user=================

app.post("/api/users/login", async (req, res) => {
  try {
    // const user = new User(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(401)
        .json({ loginSuccess: false, msg: "Email not found" });

    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ loginSuccess: false, msg: "Incorrect password" });

    const payload = { id: user._id, name: user.username };
    const token = sign(payload, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    user.token = token;

    await user.save();

    res.cookie("x_auth", user.token).json({ loginSuccess: true, user });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// =========================Logout user=================

app.get("/api/users/logout", auth, async (req, res) => {
  try {
    res.clearCookie("x_auth");
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { token: "" },
      { new: true }
    );

    res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
});
app.get("/api/users/logout", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { token: "" },
      { new: true }
    );

    res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
});

// =============verify Token==============

app.get("/api/users/verify", async (req, res) => {
  try {
    const token = req.cookies.x_auth;
    if (!token) return res.send(false);

    verify(token, config.ACCESS_TOKEN_SECRET, async (err, verified) => {
      if (err) return res.send(false);

      const user = await User.findById(verified.id);

      if (!user) return res.send(false);

      return res.send(true);
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
// =======Mongo Connection===========
// const URI = process.env.MONGODB_URI;
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error: ", err));

// ============Server Port==============
const port = config.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
