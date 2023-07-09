// require("dotenv").config();
require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcrypt");

const { fakeDB } = require("./src/fakeDB");

const app = express();
app.use(express.json());
app.use(cookieParser);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = process.env.PORT;

// 1. Register a user
app.get("/users", (req, res) => {
  res.send("Testing backend is working properly");
  console.log("Testing routes");
});
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    //1. check if user exist
    const user = fakeDB.find((user) => user.email === email);
    if (user) throw new Error("User already exist");
    //2. if not user, hash password
    const hashedPassword = await hash(password, 10);
    //3. save user in database
    fakeDB.push({
      id: fakeDB.length,
      email,
      password: hashedPassword,
    });
    res.send({ msg: "User Created" });

    console.log(fakeDB);
  } catch (err) {
    res.send({ error: $`{err.message}` });
  }
});

// ====================server port=========
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
