const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan('dev'))

// GET /
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
