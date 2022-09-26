const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://mern-chat-admin:<${process.env.DB_PW}>@cluster0.wt3llbv.mongodb.net/?retryWrites=true&w=majority`,
  () => {
    console.log("connected to the mongoDb");
  }
);
