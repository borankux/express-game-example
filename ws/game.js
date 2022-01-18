const {Game} = require("../game");

/**
 *
 * @param games {Map}
 * @returns {(function(*): void)|*}
 */
function handleGames(games) {
    return function (socket){
        console.log(`game:connect:${socket.id}`);
        socket.on("disconnect", () => {
            console.log(`game:disconnect:${socket.id}`);
        })

        socket.on('client-ready', (data) => {
            let room = data.room;
            let token = data.token;
            socket.join(room)
            console.log(room, token);
            console.log(`user:${token} is requesting for game start for room${room}`);
            if (games.has(room)) {
                let game = games.get(room)
                game.addUser(token)
                socket.emit('update', {
                    result:false,
                    message:'game already started'
                })
                console.log(`game:${room} already exists!`)
                return
            }

            let game = new Game(room, socket)
            game.start()
            game.addUser(token)
            games.set(room, game)
            console.log(`started new game:${room}:by user:${token}`)
        })

        socket.on('start-game', (data) => {
            let room = data.room;

            if(!games.has(room)) {
                socket.emit('update', {
                    status:'not exists!'
                })
                return
            }

            let game = games.get(room)
            socket.emit('update', {
                status:'started successfully !',
                code: game.status,
            })
        })
    }
}

module.exports = {
    handleGames
}
