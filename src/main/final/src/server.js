const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Change to your client origin
        methods: ["GET", "POST"],
        credentials: true
    }
});

const roomId = 2;

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.join(`room/${roomId}`);

    socket.on('send-message', (message) => {
        io.to(`room/${roomId}`).emit(`${roomId}`, message);

        // Simulate a reply from the other user
        const replyMessage = {
            user: { nickname: "other user" },
            content: `Reply to: ${message.content}`
        };
        setTimeout(() => {
            io.to(`room/${roomId}`).emit(`${roomId}`, replyMessage);
        }, 1000); // delay to simulate thinking time
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});
