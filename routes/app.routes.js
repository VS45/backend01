const express = require("express");
const { getUsers, postUser } = require("../controller/user");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", postUser);
module.exports = router;
