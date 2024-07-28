const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./model/User");
const port = 3000;

app.use(cors());
app.use(express.json());

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Bloggee")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoError", err));
  
  app.post("/register", async (req, res) => {
      const { username, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      try {
    const userDoc = await User.create({
      username,
      hashedPassword,
    });
    res.json(userDoc);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "User creation failed" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
