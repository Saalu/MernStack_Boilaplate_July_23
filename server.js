// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { hash, compare } = require("bcrypt");

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
