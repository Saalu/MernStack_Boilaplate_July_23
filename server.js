// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

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

app.post("/api/users/register", async (req, res) => {
  try {
    const user = new User(req.body);
    console.log({ user });
    await user.save();
    res.json({ success: true, data: user });
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
