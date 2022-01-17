const moment = require("moment");

const tick = (socket) => {
    setInterval(() => {
        socket.emit("tick", {
            time: moment().toISOString()
        })
    }, 1000)
}

module.exports = (socket)=> {
    console.log(`admin:connect:${socket.id}`);
    tick(socket)

    socket.on("disconnect", () => {
        console.log(`admin:disconnect:${socket.id}`);
    })

    socket.on('client-ready', (data) => {
        console.log(data);
    })
}