const io = require("socket.io")(8000);

const users = {};

//io.on = it is an instance of socket.io which listen many socket connection
io.on("connection", (socket) => {
  //socket.on = whenever someting happens to a perticular connection, what should be the output will be handle by socket.on
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    //it emmit the event of the new joind person exccept that person
    socket.broadcast.emit("user-joined", name);
  });

  //if someone send the chat message than what should return
  socket.on("send", (message) => {
    //it broadcast to all the people and receive the messagex
    socket.broadcast.emit("receive", { message, name: users[socket.id] });
  });
});
