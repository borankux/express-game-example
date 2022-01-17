const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
const config = require('./config')
const io = new Server(server, config)
const handleAdmin = require('./ws/admin')
const handleGame  = require('./ws/game')
const { initAPI } = require('./api')
const cors = require('cors')
const redis = require('./redis').client

app.use(cors({
    origin:'http://localhost:8080',
    optionsSuccessStatus: 200,
}))

io.of("/admin", handleAdmin)
io.of("/game", handleGame)

initAPI(app)
server.listen(3000)

console.log("listening on http://localhost:3000")

