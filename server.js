const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminroutes");
const adminProductRoutes = require("./routes/adminProductsRoutes");
const connectdb = require("./config/connectdb");

dotenv.config({
  path: "./config/config.env",
});

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Successfull Response");
});

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);

connectdb();

app.listen(process.env.PORT, () => {
  console.log(`Server is runnig on port ${process.env.PORT}`);
});
