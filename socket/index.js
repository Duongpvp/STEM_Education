const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // active User
  socket.on("active-user", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      // console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("setup", (userData) => {
    socket.join(userData._id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // send message to a specific user
  socket.on("send-message", (receivedData) => {
    const chats = receivedData.chat;
    if (!chats.users) return console.log("chat.users not defined");
        
    chats.users.forEach((user) => {
      if (user._id == receivedData.sender._id) return;
      socket.in(user._id).emit("receive-message", (receivedData));
    });
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
