const express = require("express");
const mongoose = require("mongoose");
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
Router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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
        }); // this is what we are sending inside cookies
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
  const newFilename = `${path.split("\\").pop()}.${ext}`; // Ensure correct filename
  const newPath = path + `.${ext}`; // Path for renaming file
  const urlPath = `/uploads/${newFilename}`; // URL path to access the file

  fs.renameSync(path, newPath); // Rename file

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
        cover: urlPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (err) {
    console.error("Error during post creation:", err);
    res.status(500).json({ error: "Post creation failed" });
  }
});

Router.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  let urlPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newFilename = `${path.split("\\").pop()}.${ext}`;
    newPath = `${path}.${ext}`;
    urlPath = `/uploads/${newFilename}`;

    // Rename the file
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      console.error("Token verification failed or user does not exist.");
      return res.status(401).json({ error: "Invalid token, please log in." });
    }

    try {
      const { id, title, summary, content } = req.body;
      const postDoc = await post.findById(id);

      if (!postDoc) {
        return res.status(404).json({ error: "Post not found." });
      }

      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

      if (!isAuthor) {
        return res.status(400).json({ error: "You are not the author." });
      }

      // Update the post fields
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      if (newPath) {
        postDoc.cover = urlPath;
      }

      // Save the updated post document
      await postDoc.save();

      res.json(postDoc);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post." });
    }
  });
});


Router.get("/post", async (req, res) => {
  const posts = await post
    .find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 }) // descending order
    .limit(20); //only 20 posts
  res.json(posts);
});

Router.get("/post/:id", async (req, res) => {
  // res.json(req.params);
  const { id } = req.params;
  const postDoc = await post.findById(id).populate("author", ["username"]); //populate will give us all the info about the author, if we do username then it will give all the info about the username inside the author
  res.json(postDoc);
});

module.exports = Router;

//Search for use of Router, in Youtube

// learn a heck lot about cookies bro please

// search on how to build the logout method
