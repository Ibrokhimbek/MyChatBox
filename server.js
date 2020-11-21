const http = require("http");
const socketio = require("socket.io");

const server = http.createServer((req, res) => {
  res.end("Hello server");
});

server.listen(3000, () => {
  console.log("Server is working");
});

const io = socketio.listen(server);

io.sockets.on("connection", (socket) => {
  console.log("Client was connected");

  socket.on("disconnect", (socket) => {
    console.log("Client was disconnected");
  });

  socket.on("NewUser", (data) => {
    console.log(data);

    socket.broadcast.emit("UserMessage", { message: data.name });
  });
});
