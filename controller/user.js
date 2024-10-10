const User = require("../model/user");
const bcrypt = require("bcryptjs");
exports.getUsers = (req, res) => {
  User.findAllUsers((err, users) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(users);
  });
};

exports.postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = { email: email, password: hashedPassword };
    User.createUser(user, (error, result) => {
      console.log(error);
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error });
      }
      return res.status(201).json(user);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
