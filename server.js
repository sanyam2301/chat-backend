const express = require("express");
const app = express();

const rooms = ["general", "tech", "finance", "crypto"]; // room for wiggle and changes
const cors = require("cors"); //define the usage of cors
const userRoutes = require("./routes/userRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(userRoutes);
require("./connection"); // connected the mongo db atals services
const server = require("http").createServer(app);
const PORT = 5001;
const io = require("socket.io")(server, {
  cors: {
    origin: "http//localhost:5001`",
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => {
  console.log("listening to the port", PORT);
});
