const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const httpServer = createServer(app);
app.use(cors({ origin: "http://localhost:3000" }));
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Set your client URL here if needed
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connection established");
  socket.on("beginPath", (args) => {
    socket.broadcast.emit("beginPath", args);
  });
  socket.on("drawLine", (args) => {
    socket.broadcast.emit("drawLine", args);
  });
  socket.on("changeConfig", (args) => {
    socket.broadcast.emit("changeConfig", args);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(4000, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("Server listening on port 4000");
  }
});
