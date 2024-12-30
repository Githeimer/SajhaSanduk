const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello world");
});

app.listen(PORT, (error) => {
  if (!error) console.log("Server is running on port " + PORT);
  else console.log("Server crash", error);
});
