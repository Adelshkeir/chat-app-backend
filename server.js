import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors"; // Import the cors middleware



import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const CONNECTION_EVENT = "connection";
const DISCONNECT_EVENT = "disconnect";
const CHAT_MESSAGE_EVENT = "chat message";

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);

io.on(CONNECTION_EVENT, (socket) => {
  console.log("a user connected");
  socket.emit("hello");

  socket.on(DISCONNECT_EVENT, () => {
    console.log("user disconnected");
  });

  socket.on(CHAT_MESSAGE_EVENT, (msg) => {
    console.log("message received on server:", msg);
    io.emit(CHAT_MESSAGE_EVENT, msg); // Broadcast the message to all clients
  });
  
});


//app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/index.html");
//});

server.listen(5000, () => {
  console.log("Server listening on *:5000");
});
