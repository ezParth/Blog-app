const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;
const post = require("./model/Post")
const router = require("./router/router");
const cookieParser = require("cookie-parser")

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cookieParser());
app.use(express.json()); //express.json() is a global middleware. It applies to all routes handled by your Express app.

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blog-apps")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoError", err));

app.use("/", router);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));




















//learn CORS and header/credentials/cookies and how to handle cookies.

//Next time when you will create the app use Routes and Router

/*  1

In the given function, we can use async await also instead of that callback, it will help you understand what is call back and what is async await 
> Do watch a video on async await and callbacks  

try {
 >   if (isPasswordValid) {
 >       const token = await jwt.sign({ username, id: userDoc._id }, secret, { expiresIn: '1h' });
 >       res.json(token);
    }
} catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
}
*/

// alert function is used in Web-Browser not in backend

/*
The typical Http response Looks like

HTTP/1.1 200 OK

Date: Mon, 27 Jul 2009 12:28:53 GMT

Server: Apache/2.2.14 (Win32)

Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT

Content-Length: 88

Content-Type: text/html

Connection: Closed

<html>
<body>
<h1>Hello, World!</h1>
</body>
</html>

The response consists of:
--> A status code: This indicates the outcome of the request (e.g., success, error, redirection).

--> A response body: This contains the data you want to send back to the client (in your case, the userDoc).
 */

/*
app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
        if(err) throw err;
        res.cookie("token", token).json("ok");
      });
    } else {
      return res.status(401).json({ error: "Wrong password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});
*/
