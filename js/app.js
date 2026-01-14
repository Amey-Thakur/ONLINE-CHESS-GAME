/**
 * @file app.js
 * @description Client-side JavaScript for the Online Chess Game.
 * Handles DOM manipulation, Socket.IO client events, game logic integration with chess.js,
 * board rendering with chessboard.js, and user interactions including chat and game mode selection.
 * 
 * @author Amey Thakur <https://github.com/Amey-Thakur>
 * @author Mega Satish <https://github.com/Mega-Satish>
 * @created 2022-08-09
 * @repository https://github.com/Amey-Thakur/ONLINE-CHESS-GAME
 * @license MIT
 */

// DOM Elements
const formEl = document.querySelectorAll('#joinForm > div > input')
const joinButtonEl = document.querySelector('#joinButton')
const messageEl = document.querySelector('#message')
const statusEl = document.querySelector('#status')
const ChatEl = document.querySelector('#chat')
const sendButtonEl = document.querySelector('#send')
const roomsListEl = document.getElementById('roomsList');
const myAudioEl = document.getElementById('myAudio');
const singlePlayerEl = document.getElementById('singlePlayer');
const multiPlayerEl = document.getElementById('multiPlayer');
const totalRoomsEl = document.getElementById('rooms')
const totalPlayersEl = document.getElementById('players')
const chatContentEl = document.getElementById('chatContent')

// Game Configuration
var config = {};
var board = null;
var game = new Chess()
var turnt = 0;

// Initialize Semantic UI Components
$('.ui.dropdown').dropdown();

/**
 * Handle Room Dropdown Selection
 * Updates the room input field when a room is selected from the dropdown
 */
$("#roomDropdown").dropdown({
    onChange: function (val) {
        console.log(val)
        console.log('running the function')
        formEl[1].value = val
    }
});

/**
 * Handle Drag Start Event (Single Player)
 * Validates if the game is over or if the correct piece color is being moved.
 * @param {string} source - Source square
 * @param {string} piece - Piece being moved
 * @param {string} position - Current board position
 * @param {string} orientation - Board orientation
 * @returns {boolean} - False if move is invalid
 */
function onDragStart2(source, piece, position, orientation) {
    // Check if game is over
    if (game.game_over()) {
        if (game.in_draw()) {
            alert('Game Draw!!');
        }
        else if (game.in_checkmate())
            if (turnt === 1) {
                alert('You won the game!!');
            } else {
                alert('You lost!!');
            }
        return false
    }

    // Restrict to White pieces (AI is Black)
    if (piece.search(/^b/) !== -1) return false
}

/**
 * AI Move Logic (Random Move)
 * Generates a random legal move for the computer component.
 */
function makeRandomMove() {
    var possibleMoves = game.moves()

    // Game over check
    if (possibleMoves.length === 0) {
        return;
    }

    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    game.move(possibleMoves[randomIdx]);
    myAudioEl.play();
    turnt = 1 - turnt;
    board.position(game.fen());
}

/**
 * Handle Piece Drop (Single Player)
 * Executes the player's move and triggers the AI's response.
 * @param {string} source - From square
 * @param {string} target - To square
 * @returns {string|null} - 'snapback' if illegal move
 */
function onDrop2(source, target) {
    // Validate move
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for simplicity
    })

    myAudioEl.play();

    // Illegal move
    if (move === null) return 'snapback'

    turnt = 1 - turnt;

    // Trigger AI move after a short delay
    window.setTimeout(makeRandomMove, 250)
}

/**
 * Handle Snap End (Single Player)
 * Updates the board position after a move completes (e.g., castling, promotion)
 */
function onSnapEnd2() {
    board.position(game.fen())
}

// ----------------------------------------------------------------------------
// Single Player Mode Event Listener
// ----------------------------------------------------------------------------
singlePlayerEl.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('gameMode').style.display = "none";
    document.querySelector('#chessGame').style.display = null;

    config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart2,
        onDrop: onDrop2,
        onSnapEnd: onSnapEnd2
    }
    board = Chessboard('myBoard', config);
})

// ----------------------------------------------------------------------------
// Multiplayer Mode Logic (Socket.IO)
// ----------------------------------------------------------------------------

// Connection established on page load
const socket = io()

/**
 * Handle Piece Drop (Multiplayer)
 * Emits the move event to the server.
 */
function onDrop(source, target) {
    var room = formEl[1].value;
    myAudioEl.play();
    socket.emit('Dropped', { source, target, room })
}

/**
 * Receive Update Event
 * Update game status, FEN string, and PGN history from server.
 */
socket.on('updateEvent', ({ status, fen, pgn }) => {
    statusEl.textContent = status
    fenEl.textContent = fen
    pgnEl.textContent = pgn
})

socket.on('printing', (fen) => {
    console.log(fen)
})

/**
 * Display Board Event
 * Renders the board based on the FEN string received from server.
 * Initializes the game UI for multiplayer session.
 */
socket.on('DisplayBoard', (fenString, userId, pgn) => {
    console.log(fenString)

    // Initial Game Setup
    if (userId != undefined) {
        messageEl.textContent = 'Match Started!! Best of Luck...'
        if (socket.id == userId) {
            config.orientation = 'black'
        }
        document.getElementById('joinFormDiv').style.display = "none";
        document.querySelector('#chessGame').style.display = null
        ChatEl.style.display = null
        document.getElementById('statusPGN').style.display = null
    }

    config.position = fenString
    board = ChessBoard('myBoard', config)
    document.getElementById('pgn').textContent = pgn
})

/**
 * Dragging Control
 * Disables dragging for the player who just moved (waiting for opponent).
 */
socket.on('Dragging', id => {
    if (socket.id != id) {
        config.draggable = true;
    } else {
        config.draggable = false;
    }
})

/**
 * Update Game Status Text
 * Displays whose turn it is.
 */
socket.on('updateStatus', (turn) => {
    if (board.orientation().includes(turn)) {
        statusEl.textContent = "Your turn"
    }
    else {
        statusEl.textContent = "Opponent's turn"
    }
})

/**
 * Check Status Handler
 * Alerts the user if they are in check.
 */
socket.on('inCheck', turn => {
    if (board.orientation().includes(turn)) {
        statusEl.textContent = "You are in Check!!"
    }
    else {
        statusEl.textContent = "Opponent is in Check!!"
    }
})

/**
 * Game Over Handler
 * Displays the result of the game (Win/Loss/Draw).
 */
socket.on('gameOver', (turn, win) => {
    config.draggable = false;
    if (win) {
        if (board.orientation().includes(turn)) {
            statusEl.textContent = "You lost, better luck next time :)"
        }
        else {
            statusEl.textContent = "Congratulations, you won!!"
        }
    }
    else {
        statusEl.value = 'Game Draw'
    }
})

/**
 * Disconnection Handler
 * Notifies if the opponent disconnects.
 */
socket.on('disconnectedStatus', () => {
    alert('Opponent left the game!!')
    messageEl.textContent = 'Opponent left the game!!'
})

/**
 * Chat Message Receiver
 * Appends received messages to the chat window.
 */
socket.on('receiveMessage', (user, message) => {
    var chatContentEl = document.getElementById('chatContent')
    chatContentEl.scrollTop = chatContentEl.scrollHeight;
    var divEl = document.createElement('div')

    if (formEl[0].value == user) {
        divEl.classList.add('myMessage');
        divEl.textContent = message;
    }
    else {
        divEl.classList.add('youMessage');
        divEl.textContent = message;
        document.getElementById('messageTone').play();
    }

    var style = window.getComputedStyle(document.getElementById('chatBox'));
    if (style.display === 'none') {
        document.getElementById('chatBox').style.display = 'block';
    }

    chatContentEl.appendChild(divEl);
    divEl.focus();
    divEl.scrollIntoView();
})

/**
 * Rooms List Update
 * Updates the dropdown with available rooms.
 */
socket.on('roomsList', (rooms) => {
    totalRoomsEl.innerHTML = rooms.length
    var dropRooms = document.getElementById('dropRooms')
    while (dropRooms.firstChild) {
        dropRooms.removeChild(dropRooms.firstChild)
    }

    rooms.forEach(x => {
        var roomEl = document.createElement('div')
        roomEl.setAttribute('class', 'item')
        roomEl.setAttribute('data-value', x)
        roomEl.textContent = x;
        dropRooms.appendChild(roomEl)
    })
})

/**
 * Player Count Update
 */
socket.on('updateTotalUsers', totalUsers => {
    console.log('event listened')
    totalPlayersEl.innerHTML = totalUsers;
})

/**
 * Chat Send Button Listener
 */
sendButtonEl.addEventListener('click', (e) => {
    e.preventDefault()
    var message = document.querySelector('#inputMessage').value
    var user = formEl[0].value
    var room = formEl[1].value
    document.querySelector('#inputMessage').value = ''
    document.querySelector('#inputMessage').focus()
    socket.emit('sendMessage', { user, room, message })
})

/**
 * Join Game Button Listener
 * Validates inputs and emits join request.
 */
joinButtonEl.addEventListener('click', (e) => {
    e.preventDefault()
    var user = formEl[0].value, room = formEl[1].value

    if (!user || !room) {
        messageEl.textContent = "Input fields can't be empty!"
    }
    else {
        joinButtonEl.setAttribute("disabled", "disabled");
        formEl[0].setAttribute("disabled", "disabled")
        document.querySelector('#roomDropdownP').style.display = 'none';
        formEl[1].setAttribute("disabled", "disabled")

        // Attempt to join room
        socket.emit('joinRoom', { user, room }, (error) => {
            messageEl.textContent = error
            if (alert(error)) {
                window.location.reload()
            }
            else {
                window.location.reload();
            }
        })
        messageEl.textContent = "Waiting for other player to join"
    }
})

/**
 * Multiplayer Mode Selection Listener
 */
multiPlayerEl.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('joinFormDiv').style.display = "block";
    document.getElementById('gameMode').style.display = "none";

    var board = ChessBoard('myBoard')
    config = {
        draggable: false,   // Initially disabled until game starts
        position: 'start',
        onDrop: onDrop,
        orientation: 'white'
    }
})

// ----------------------------------------------------------------------------
// UI Helper Functions (Color Schemes)
// ----------------------------------------------------------------------------

const applyColorScheme = (black, white) => {
    const blackEl = document.querySelectorAll('.black-3c85d');
    for (var i = 0; i < blackEl.length; i++) {
        blackEl[i].style.backgroundColor = black;
        blackEl[i].style.color = white;
    }
    const whiteEl = document.querySelectorAll('.white-1e1d7');
    for (var i = 0; i < whiteEl.length; i++) {
        whiteEl[i].style.backgroundColor = white;
        whiteEl[i].style.color = black;
    }
}

const removeClass = () => {
    const buttonEl = document.querySelectorAll('.color_b');
    for (var i = 0; i < buttonEl.length; i++) {
        buttonEl[i].classList.remove('black');
        buttonEl[i].classList.remove('grey');
    }
}

// ----------------------------------------------------------------------------
// Theme Switching Event Listeners
// ----------------------------------------------------------------------------

document.getElementById('grey_board').addEventListener('click', e => {
    e.preventDefault();
    removeClass();
    document.getElementById('grey_board').classList.add('black');
    document.getElementById('orange_board').classList.add('grey');
    document.getElementById('green_board').classList.add('grey');
    document.getElementById('blue_board').classList.add('grey');
    applyColorScheme("#E1E1E1", "#FFFFFF");
})

document.getElementById('orange_board').addEventListener('click', e => {
    e.preventDefault();
    removeClass();
    document.getElementById('grey_board').classList.add('grey');
    document.getElementById('orange_board').classList.add('black');
    document.getElementById('green_board').classList.add('grey');
    document.getElementById('blue_board').classList.add('grey');
    applyColorScheme("#D18B47", "#FFCE9E");
})

document.getElementById('green_board').addEventListener('click', e => {
    e.preventDefault();
    removeClass();
    document.getElementById('grey_board').classList.add('grey');
    document.getElementById('orange_board').classList.add('grey');
    document.getElementById('green_board').classList.add('black');
    document.getElementById('blue_board').classList.add('grey');
    applyColorScheme("#58AC8A", "#FFFFFF");
})

document.getElementById('blue_board').addEventListener('click', e => {
    e.preventDefault();
    removeClass();
    document.getElementById('grey_board').classList.add('grey');
    document.getElementById('orange_board').classList.add('grey');
    document.getElementById('green_board').classList.add('grey');
    document.getElementById('blue_board').classList.add('black');
    applyColorScheme("#727FA2", "#C3C6BE");
})

// Chat Toggle
document.getElementById('messageBox').addEventListener('click', e => {
    e.preventDefault();
    var style = window.getComputedStyle(document.getElementById('chatBox'));
    if (style.display === 'none') {
        document.getElementById('chatBox').style.display = 'block';
    } else {
        document.getElementById('chatBox').style.display = 'none';
    }
})
// ----------------------------------------------------------------------------
// Security & Anti-Inspection Protocols
// ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const securityOverlay = document.getElementById('securityOverlay');
    const dismissBtn = document.getElementById('dismissSecurity');

    // Disable Right Click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showSecurityAlert();
    });

    // Disable Keyboard Shortcuts for Inspection
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            showSecurityAlert();
        }
        // Ctrl+Shift+I/J/C (DevTools)
        if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
            e.preventDefault();
            showSecurityAlert();
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.key.toUpperCase() === 'U') {
            e.preventDefault();
            showSecurityAlert();
        }
    });

    // Show Security Overlay
    function showSecurityAlert() {
        securityOverlay.style.display = 'flex';
        // Add pulse animation to icon
        const icon = securityOverlay.querySelector('div');
        icon.classList.add('security-icon');
    }

    // Dismiss Security Overlay
    dismissBtn.addEventListener('click', () => {
        securityOverlay.style.display = 'none';
        // Remove animation to reset
        const icon = securityOverlay.querySelector('div');
        icon.classList.remove('security-icon');
    });

    // Console Easter Egg (Self-XSS Warning)
    console.log("%cStop!", "color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 0px black;");
    console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or 'hack' someone's account, it is a scam and will give them access to your account.", "color: white; font-size: 18px; font-weight: bold;");
    console.log("%cSee https://en.wikipedia.org/wiki/Self-XSS for more information.", "color: cyan; font-size: 16px; font-weight: bold; text-decoration: underline;");
});
