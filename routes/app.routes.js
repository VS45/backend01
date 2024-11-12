const express = require("express");
const { getUsers, postUser, postLogin } = require("../controller/user");
const isAuth = require("../middleware/tokenAuth");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", isAuth, postUser);
router.post("/login", postLogin);
module.exports = router;
