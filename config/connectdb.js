const mongoose = require("mongoose");

const connectdb = () => {
  console.log(process.env.MONGO_URI);
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "amazon_clone",
    })
    .then(() => console.log(`Databse connected on port ${process.env.PORT}`))
    .catch((err) => console.log(err));
};

module.exports = connectdb;
