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
const { Game } = require('./game')

app.use(cors({
    origin:'http://localhost:8080',
    optionsSuccessStatus: 200,
}))

let games = new Map()

io.of("/admin", handleAdmin(games))
io.of("/game", handleGames(games))

initAPI(app)
server.listen(3000)

console.log("listening on http://localhost:3000")

