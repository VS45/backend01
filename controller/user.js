const User = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
require("dotenv").config({ path: __dirname + "/.env" });
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.postUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log(email, password);
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ email: email, password: hashedPassword, username });
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.staus(500).json({ message: err });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  try {
    console.log(`Inside, ${user}`);
    if (user) {
      const doMatch = await bcrypt.compare(password, user.password);
      if (doMatch) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString(),
          },
          process.env.JWT_SECRET,
          { expiresIn: "8760h" }
        );
        // return sendJson(res, { token: token, userId: user._id });
        return res.status(200).json({ token: token, userId: user._id });
      } else {
        return res
          .status(403)
          .json({ message: `Password ${password} is Wrong` });
      }
    } else {
      //return sendApiError(res, `User with email ${email} not Found `);
      return res
        .status(403)
        .json({ message: `User with email ${email} not Found ` });
    }
  } catch (err) {
    // res.status(500).json({ message: "Could not logged In" });
    return res
      .status(500)
      .json({ message: `Could not logged In:  ${err.message}` });
  }
};
