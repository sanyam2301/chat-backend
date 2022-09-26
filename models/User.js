const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//defining user models

const UserSchema = mongoose.Schema({
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
});
