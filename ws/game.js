const fs = require('fs')
const threading = require('child_process')

const moment = require("moment");

module.exports =(socket) => {
    console.log(`game:connect:${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`game:disconnect:${socket.id}`);
    })

    socket.on('client-ready', (data) => {
        console.log('client says he is ready');
        console.log(data);
        let initial = {
            users: [
                {
                    name: 'Frank'
                }
            ]
        }
        threading.spawn("node", ["game.js", "game-id", ])
        socket.emit('init-game', initial)
        socket.join(data.room)
    })

}
