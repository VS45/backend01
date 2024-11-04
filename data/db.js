const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("connecting...");
    return;
  }
  try {
    mongoose.connect(MONGODB_URI);
    console.log("connected!");
  } catch (err) {
    console.log("Error: ", err);
    throw new Error(`Error:`, err);
  }
};

module.exports = connect;
