const { getGameRooms } = require('../game-tool')
const moment = require("moment");
const tick = (socket, games) => {
    setInterval(() => {
        let rooms = getGameRooms(games)
        socket.emit("tick", {
            rooms: rooms,
            time: moment.now()
        })
    }, 1000)
}

function handleAdmin(games) {
    return function (socket) {
        console.log(`admin:connect:${socket.id}`);
        tick(socket, games)

        socket.on("disconnect", () => {
            console.log(`admin:disconnect:${socket.id}`);
        })

        socket.on('client-ready', (data) => {
            console.log(data);
        })
    }
}

module.exports = {
    handleAdmin,
}