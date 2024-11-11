const express = require("express");
const { getUsers, postUser, postLogin } = require("../controller/user");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", postUser);
router.post("/login", postLogin);
module.exports = router;
