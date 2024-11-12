const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/.env" });
module.exports = (req, res, next) => {
  const myToken = req.get("Authorization");
  if (!myToken) return res.status(401).json({ error: "No token Provided" });
  const token = myToken.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token Provided" });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    if (!decodedToken) {
      return res.status(403).json("Not Authenticated");
    }
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};
