const User = require("../model/users");
const bcrypt = require("bcryptjs");
exports.getUsers = (req, res) => {
  User.findAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(users);
  });
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
