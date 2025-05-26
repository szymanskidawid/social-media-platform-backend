const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const setupSocketEvents = require("./sockets");
const mongoose = require("mongoose");
require("dotenv").config();

const chatsRoutes = require("./routes/chatsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const loginsRoutes = require("./routes/loginsRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const peopleRoutes = require("./routes/peopleRoutes");
const postsRoutes = require("./routes/postsRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  }
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Social Media Platform API!");
});

app.use("/chats", chatsRoutes);
app.use("/comments", commentsRoutes);
app.use("/logins", loginsRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/people", peopleRoutes);
app.use("/posts", postsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  })
})

setupSocketEvents(io);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
