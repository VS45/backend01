const express = require("express");
const userRoute = require("./routes/app.routes");
require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
app.use(express.json());

app.use(userRoute);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`app running at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
