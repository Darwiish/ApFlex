const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const saltRounds = 6;

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

User.pre("save", function(next) {
  if (this.isNew) {
    const document = this;
    bcrypt.hash(this.password, saltRounds, function(err, pass) {
      document.password = pass;
      next();
    });
  } else {
    next();
  }
});

User.methods.checkpassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("User", User, "Users");
