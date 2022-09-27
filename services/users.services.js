const User = require("../models/users.model");
const bcryptjs = require("bcryptjs");
const auth = require("../middlewares/auth");

async function login({ email, password }, callback) {
  const user = await User.findOne({ email });

  if (user != null) {
    if (bcryptjs.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(email);
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: "Invalid Password",
      });
    }
  } else {
    return callback({
      message: "Email and password do not match",
    });
  }
}

async function register(params, callback) {
  if (params.username === undefined) {
    return callback({ message: "Username Required" });
  }
  const user = new User(params);
  user
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  login,
  register,
};
