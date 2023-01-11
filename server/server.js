import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});

//// Socket

io.on("connection", (socket) => {
  console.log(`${socket.id} joined`);

  socket.on("joinRoom", (message, room) => {
    if (room == "") {
      socket.broadcast.emit("recieve-message", message);
    } else {
      socket.join(room);
      socket.to(room).emit("recieve-message", message);
    }
  });

  socket.emit("sendStats", () => {
    console.log(" Stat request has been sent");
  });

  socket.on("myStats", (speed, cal) => {
    console.log(
      `My average pace is ${speed} and I have burned ${cal} calories`
    );
  });
});

httpServer.listen(3000, () => {
  console.log(`Server is up on localhost:3000`);
});
