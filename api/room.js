const {generateRoomID} = require("../utils/room");

const handleCreateRoom = (req, res, next) => {
    let token = req.header("X-Game-Token")
    //do something with the token
    let generator = generateRoomID()
    let roomId = generator.next().value;
    res.json({
        room: roomId,
    })
}

const handleCheckRoom = (req, res, next) => {
    let id = req.query.id
    //check room and return result
    res.json({
        exists: false
    })
}

module.exports = {
    handleCreateRoom,
    handleCheckRoom
}
