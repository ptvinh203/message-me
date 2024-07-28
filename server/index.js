import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads/recordings", express.static("uploads/recordings"));
app.use("/uploads/images", express.static("uploads/images"));
app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);

const server = app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${server.address().port}`);
});

const io = new Server(server, {
   cors: {
      origin: process.env.CLIENT_HOST,
   },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
   global.chatSocket = socket;

   // User connection
   socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.broadcast.emit("online-users", {
         onlineUsers: Array.from(onlineUsers.keys()),
      });
      console.log("User connected: ", userId, onlineUsers.keys());
   });

   // User disconnection
   socket.on("signout", (userId) => {
      onlineUsers.delete(userId);
      socket.broadcast.emit("online-users", {
         onlineUsers: Array.from(onlineUsers.keys()),
      });
      console.log("User disconnected: ", userId, onlineUsers.keys());
   });

   // Send message
   socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      console.log("Send message to: ", data.to, sendUserSocket);
      if (sendUserSocket) {
         socket.to(sendUserSocket).emit("msg-receive", {
            from: data.from,
            message: data.message,
         });
      }
   });

   // Voice call
   socket.on("outgoing-voice-call", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      console.log("Outgoing voice call to: ", data.to, sendUserSocket);
      if (sendUserSocket) {
         socket.to(sendUserSocket).emit("incoming-voice-call", {
            from: data.from,
            roomId: data.roomId,
            callType: data.callType,
         });
      }
   });

   socket.on("reject-voice-call", (data) => {
      const sendUserSocket = onlineUsers.get(data.from);
      console.log("Reject voice call from: ", data.from, sendUserSocket);
      if (sendUserSocket) {
         socket.to(sendUserSocket).emit("voice-call-rejected");
      }
   });

   // Video call
   socket.on("outgoing-video-call", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      console.log("Outgoing video call to: ", data.to, sendUserSocket);
      if (sendUserSocket) {
         socket.to(sendUserSocket).emit("incoming-video-call", {
            from: data.from,
            roomId: data.roomId,
            callType: data.callType,
         });
      }
   });

   socket.on("reject-video-call", (data) => {
      const sendUserSocket = onlineUsers.get(data.from);
      console.log("Reject video call from: ", data.from, sendUserSocket);
      if (sendUserSocket) {
         socket.to(sendUserSocket).emit("video-call-rejected");
      }
   });

   // Accept call
   socket.on("accept-incoming-call", ({ id }) => {
      const sendUserSocket = onlineUsers.get(id);
      console.log("Accept incoming call from: ", id, sendUserSocket);
      socket.to(sendUserSocket).emit("accept-call");
   });
});
