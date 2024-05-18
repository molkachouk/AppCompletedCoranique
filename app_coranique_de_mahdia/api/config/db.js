const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODBURI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
