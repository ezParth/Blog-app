const express = require("express");
const cors = require("cors")
const app = express();
const port = 3000;

app.use(cors());

app.post("/register", (req, res) => {
    const {username, password} = req.body;
    res.json('Hello World!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
