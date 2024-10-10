const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");

dotenv.config({
  path: "./config/config.env",
});

const app = express();

app.get("/", (req, res) => {
  res.send("Successfull Response");
});

connectdb();

app.listen(3000, () => {
  console.log(`Server is runnig on port ${process.env.PORT}`);
});
