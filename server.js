const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Run when client connects
io.on("connection", (socket) => {
    // SINGLE CLIENT
    socket.emit("message", "Welcome to Dhyanify");

    // Broadcast when a user connects
    // TO ALL THE CLIENTS EXPECT SENDER
    socket.broadcast.emit("message", "A user has joined the chat");

    // Runs when client disconnects
    // TO ALL THE CLIENTS
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat");
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        io.emit("message", msg);
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
