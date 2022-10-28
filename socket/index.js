const moment = require("moment/moment");

const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = []; 

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    socket.join(newUserId);
    // send all active users to new user
    io.emit("get-users", activeUsers);

    let logUser = [
      {
        name: moment().format("HH") + "H",
        user: activeUsers.length,
      },
    ];
    io.emit("get-log-online", logUser);

    setInterval(() => {
      for (var i = 0; i < activeUsers.length; i++) {
        if (logUser.length < 24) {
          logUser.push({
            name: moment().format("HH") + "H",
            user: activeUsers.length,
          });
        } else {
          logUser.shift();
          logUser.push({
            name: moment().format("HH") + "H",
            user: activeUsers.length,
          });
        }
      }
      io.emit("get-log-online", logUser);
    }, [3600000]);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    var chat = data.data.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == data.data.sender._id) return;
      let userSocket;
      for (var i = 0; i < activeUsers.length; i++) {
        if (activeUsers[i].userId === user._id) {
          userSocket = activeUsers[i].socketId;
        }
      }
      io.to(userSocket).emit("receive-message", data.data);
      // socket.in(user._id).emit("receive-message", data.data);
      // const { receiverId } = data;
      // const userIO = activeUsers.find((user) => user.userId === receiverId._id);
      // console.log("receiverId :", user);
      // socket.to(user._id).emit("receive-message", data.data);
    });

    // const { receiverId } = data;
    // const user = activeUsers.find((user) => user.userId === receiverId._id);
    // if (user) {
    //   io.to(user.socketId).emit("receive-message", data);
    // }
  });
});
