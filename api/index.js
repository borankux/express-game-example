const { generateToken } = require("../utils/token");
const { generateRoomID } = require("../utils/room");

const serveHomePage= (req, res) => {
    res.json({
        a:'b'
    })
}

const serveAuth = (req, res) => {
    let token = req.query.token;
    if(!token || token === "undefined" || token ==="null") {
        //refreshing token
        token = generateToken()
    }

    res.json({
        token: token
    })
}

const serveCreateRoom = (req, res, next) => {
    let token = req.header("X-Game-Token")
    //do something with the token
    let generator = generateRoomID()
    let roomId = generator.next().value;
    res.json({
        room: roomId,
    })
}

const serveCheckRoom = (req, res, next) => {
    let id = req.query.id
    //check room and return result
    res.json({
        exists: false
    })
}

const initAPI = (app) => {
    app.get('/', serveHomePage)
    app.get('/api/auth', serveAuth)
    app.post('/api/room', serveCreateRoom)
    app.get('/api/room', serveCheckRoom)
}

module.exports = {
    initAPI
}