const express = require("express");
const Router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const post = require("../model/Post");
const { errorMonitor } = require("stream");

// Router.use('/uploads', express.static(__dirname + '/uploads'));

const uploadMiddleware = multer({
  dest: path.join(__dirname, "../uploads"),
});

const secret = process.env.TOKEN;

Router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const userDoc = await User.create({
      username,
      hashedPassword,
      salt,
    });
    res.json(userDoc);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "User creation failed" });
  }
});

Router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);
    if (isPasswordValid) {
      //logged in
      jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: user._id,
          username,
        });// this is what we are sending inside cookies
      });
    } else {
      return res.status(401).json({ error: "Wrong password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

Router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  try {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (error) {
    console.log("Error verifying token: ", error);
  }
});

Router.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

Router.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  console.log("Received", req.file);
  const { originalname, path } = req.file;
  const parts = originalname.split("."); // if 'myfile.txt' then == ['myfile','txt']
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        console.error("Token verification failed or user does not exist.");
        return res.status(401).json({ error: "Invalid token, please log in." });
      }

      const { title, summary, content } = req.body;
      const postDoc = await post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (err) {
    console.error("Error during post creation:", err);
    res.status(500).json({ error: "Post creation failed" });
  }
});


Router.get("/post", async (req, res) => {
  const posts = await post.find().populate('User');
  res.json(posts);
});

module.exports = Router;

//Search for use of Router, in Youtube

// learn a heck lot about cookies bro please

// search on how to build the logout method
