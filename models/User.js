const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//defining user models

const UserSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Can't be Blank"],
    },
    Email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Can't be Blank"],
      index: true,
      validate: [isEmail, "Invalid Email"],
    },
    Password: {
      type: String,
      required: [true, "Can't be Blank"],
    },
    picture: {
      type: String,
    },
    newmessages: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { minimize: false }
);
// minimize is used to put default empty values where they are not
//create password middleware hash is the password of user before it saves it
UserSchema.pre("save", function (next) {
  const use = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.toJson = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.statics.FindByCredentials = async function (email, password) {
  const user = await User.findOne(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  return user; // return user_routes
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
