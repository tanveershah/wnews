const express = require("express");
const app = express();

// GET /
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
