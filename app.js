const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const chatsRoutes = require("./routes/chatsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const loginsRoutes = require("./routes/loginsRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const peopleRoutes = require("./routes/peopleRoutes");
const postsRoutes = require("./routes/postsRoutes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use("/chats", chatsRoutes);
app.use("/comments", commentsRoutes);
app.use("/logins", loginsRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/people", peopleRoutes);
app.use("/posts", postsRoutes);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
