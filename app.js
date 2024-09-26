const express = require("express");
const userRoute = require("./routes/app.routes");

const app = express();

const PORT = 8080;
app.use(express.json());


app.use(userRoute);
app.listen(PORT, () => {
  console.log(`app running at port ${PORT}`);
});
