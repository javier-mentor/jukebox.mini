const express = require("express");
const app = express();
const port = 3000;

const usersRouter = require("./users.js"); // Import the router

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Let's get this Jukebox Running!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
