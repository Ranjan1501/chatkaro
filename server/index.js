import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import http from "http";
import { Server } from "socket.io";
import {
  registerUser,
  loginUser,
  userById,
  getAllUsers,
} from "./src/controllers/user.controllers.js";
import {
  getUserMessages,
  getRoomMessages,
  createMessage,
} from "./src/controllers/message.controllers.js";
import {
  indexRoom,
  deleteRoom,
  updateRoom,
  createRoom,
} from "./src/controllers/rooms.controllers.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(fileUpload());

app.post("/api/users/signup", registerUser);
app.post("/api/users/login", loginUser);
app.get("/api/users/:userId", userById);
app.get("/api/users", getAllUsers);

app.get("/api/messages/user/:userId", getUserMessages);
app.get("/api/messages/group/:groupId", getRoomMessages);
app.post("/api/messages", createMessage);

app.get("/api/groups", indexRoom);
app.post("/api/groups", createRoom);
app.delete("/api/groups/:groupId", deleteRoom);
app.put("/api/groups/:groupId", updateRoom);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (message) => {
    if (message.groupId) {
      io.to(message.groupId).emit("message", message);
    } else if (message.userId) {
      socket.to(message.userId).emit("message", message);
    }
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export default server;
