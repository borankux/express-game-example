const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
const config = require('./config')
const io = new Server(server, config)
const { handleAdmin } = require('./ws/admin')
const { handleGames }  = require('./ws/game')
const { initAPI } = require('./api')
const cors = require('cors')
const redis = require('./redis').client
const { Game } = require('./models/game')
const { initCleaners } = require('./ws/cleaners')
const {User} = require("./models/user");

app.use(cors({
    origin:'http://localhost:8080',
    optionsSuccessStatus: 200,
}))

/**
 * @type {Map<String, Game>}
 */
let games = new Map()

/**
 * @type {Set<User>}
 */
let users = new Set()

io.of("/admin", handleAdmin(games))
io.of("/game", handleGames(games, users, io))
io.of('/game').adapter.on('join-room', (room, id) => {
    console.log('some one joining room:',room, id);
})

initAPI(app)
initCleaners(io)
server.listen(3000)

console.log("listening on http://localhost:3000")

