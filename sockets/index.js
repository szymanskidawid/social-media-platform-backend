const chatsEvents = require("./events/chatsEvents");
const commentsEvents = require("./events/commentsEvents");
const notificationsEvents = require("./events/notificationsEvents");
const postsEvents = require("./events/postsEvents");

const setupSocketEvents = (io) => {
  chatsEvents.on("messageAdded", (message) => {
    io.emit("newMessage", message);
  });

  commentsEvents.on("commentAdded", (comment) => {
    io.emit("newComment", comment);
  });

  notificationsEvents.on("notificationAdded", (notification) => {
    io.emit("newNotification", notification);
  });

  postsEvents.on("postAdded", (post) => {
    io.emit("newPost", post);
  });
}

module.exports = setupSocketEvents;