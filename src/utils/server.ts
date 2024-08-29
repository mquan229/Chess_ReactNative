import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { Game } from '../models/Game';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/chessgame')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Lắng nghe sự kiện 'joinGame' từ client
  socket.on('joinGame', async (gameId) => {
    const game = await Game.findById(gameId);
    if (game) {
      socket.join(gameId);
      socket.emit('gameData', game);
    }
  });

  // Lắng nghe sự kiện 'makeMove' từ client
  socket.on('makeMove', async ({ gameId, move }) => {
    const game = await Game.findById(gameId);
    if (game) {
      game.moves.push(move);
      await game.save();
      io.to(gameId).emit('moveMade', move);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
