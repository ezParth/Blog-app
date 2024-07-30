import express from "express";
import { Router } from "express";
import User from "../model/User";

//fetch User
Router.post("/data", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching User", error);
  }
});

module.exports = Router;
