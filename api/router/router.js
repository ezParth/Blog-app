const express = require("express");
const Router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");

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
        });
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
  if(!token){
    return res.status(401).json({error: "Token not provided"})
  }
  try{
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
}
catch(error){
  console.log("Error verifying token: ", error);
}
});


Router.post('/logout', (req, res) => {
  res.cookie('token', '').json("ok")
})

module.exports = Router;

//Search for use of Router, in Youtube

// learn a heck lot about cookies bro please

// search on how to build the logout method
