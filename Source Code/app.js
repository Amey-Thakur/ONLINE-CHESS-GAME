/**
 * @file app.js
 * @description Main server entry point for the Online Chess Game. Handles Express server setup,
 * Socket.IO real-time connections, game logic management, and room coordination.
 * 
 * @author Amey Thakur <https://github.com/Amey-Thakur>
 * @author Mega Satish <https://github.com/Mega-Satish>
 * @created 2022-08-09
 * @modified 2022-08-09
 * @repository https://github.com/Amey-Thakur/ONLINE-CHESS-GAME
 * @license MIT
 */

const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Chess = require('chess.js').Chess

// Initialize Express App and Server
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Server Setup
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, './')

app.use(express.static(publicDirectoryPath))

// Game State Management
const gameData = new Map()   // Maps socket ID to Chess instance
const userData = new Map()   // Maps user key to user details
const roomsList = new Set()  // Track active rooms
let totalUsers = 0;

/**
 * Socket.IO Connection Handler
 * Manages real-time events for game rooms, moves, and chat.
 */
io.on('connection', (socket) => {
    totalUsers++;

    // Initial State Emission
    io.emit('roomsList', Array.from(roomsList));
    io.emit('updateTotalUsers', totalUsers)

    /**
     * Updates game status for all players in a room
     * Checks for checkmate, draw, or check conditions
     * @param {Object} game - Chess.js game instance
     * @param {string} room - Room ID
     */
    const updateStatus = (game, room) => {
        if (game.in_checkmate()) {
            io.to(room).emit('gameOver', game.turn(), true)
        } else if (game.in_draw()) {
            io.to(room).emit('gameOver', game.turn(), false)
        } else {
            if (game.in_check()) {
                io.to(room).emit('inCheck', game.turn())
            } else {
                io.to(room).emit('updateStatus', game.turn())
            }
        }
    }

    /**
     * Joins a user to a specific room
     * Limits room capacity to 2 players and handles name collisions
     */
    socket.on('joinRoom', ({ user, room }, callback) => {
        // Validation: Limit room to 2 users
        if (io.nsps['/'].adapter.rooms[room] && io.nsps['/'].adapter.rooms[room].length === 2) {
            return callback('Already 2 users are there in the room!')
        }

        // Validation: Check for duplicate username in the same room
        var alreadyPresent = false
        for (var x in userData) {
            if (userData[x].user == user && userData[x].room == room) {
                alreadyPresent = true
            }
        }
        if (alreadyPresent) {
            return callback('Choose different name!')
        }

        socket.join(room)

        // Update Rooms List
        roomsList.add(room);
        io.emit('roomsList', Array.from(roomsList));
        io.emit('totalRooms', roomsList.length)

        // Register User
        userData[user + "" + socket.id] = {
            room, user,
            id: socket.id
        }

        // Start Game if Room is Full (2 Players)
        if (io.nsps['/'].adapter.rooms[room].length === 2) {
            roomsList.delete(room);
            io.emit('roomsList', Array.from(roomsList));
            io.emit('totalRooms', roomsList.length)

            var game = new Chess()

            // Map sockets to game instance
            for (var x in io.nsps['/'].adapter.rooms[room].sockets) {
                gameData[x] = game
            }

            // Initialize Game Board
            io.to(room).emit('Dragging', socket.id)
            io.to(room).emit('DisplayBoard', game.fen(), socket.id, game.pgn())
            updateStatus(game, room)
        }
    })

    /**
     * Handles Chess Piece Drop Event
     * Validates moves and updates game state
     */
    socket.on('Dropped', ({ source, target, room }) => {
        var game = gameData[socket.id]
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: Always promote to a queen for simplicity
        })

        if (move != null) {
            io.to(room).emit('Dragging', socket.id)
        }

        io.to(room).emit('DisplayBoard', game.fen(), undefined, game.pgn())
        updateStatus(game, room)
    })

    /**
     * Handles In-Game Chat Messages
     */
    socket.on('sendMessage', ({ user, room, message }) => {
        io.to(room).emit('receiveMessage', user, message)
    })

    /**
     * Handle Disconnection
     * Cleans up user data, room status, and game state
     */
    socket.on('disconnect', () => {
        totalUsers--;
        io.emit('updateTotalUsers', totalUsers)

        var room = '', user = '';
        for (var x in userData) {
            if (userData[x].id == socket.id) {
                room = userData[x].room
                user = userData[x].user
                delete userData[x]
            }
        }

        // Clean up empty rooms
        if (userData[room] == null) {
            roomsList.delete(room);
            io.emit('roomsList', Array.from(roomsList));
            io.emit('totalRooms', roomsList.length)
        }

        gameData.delete(socket.id)

        if (user != '' && room != '') {
            io.to(room).emit('disconnectedStatus');
        }
    })
})

/**
 * Start Server
 */
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})