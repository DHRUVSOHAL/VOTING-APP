require('dotenv').config();
const mongoose = require("mongoose");

const mongoDbURL = process.env.MONGODB_URL || process.env.LOCAL_URL;

mongoose.connect(mongoDbURL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose;
