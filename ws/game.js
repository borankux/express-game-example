const {Game} = require("../models/game");
const {User, UserList} = require("../models/user");
const redis = require('../redis').client
const {Server}  = require('socket.io')

/**
 *
 * @param games {Map}
 * @param users {Set}
 * @param io {Server}
 * @returns {(function(*): void)|*}
 */
function handleGames(games, users, io) {
    return function (socket){
        socket.on("disconnect", () => {
            socket.leaveAll()
            console.log(`game:disconnect:${socket.id}`);
        })

        socket.on('dragging', (pos) => {
            let room = pos.room;
            socket.broadcast.to(room).emit('draw', pos)
         })

        socket.on('client-ready', (data) => {
            console.log('some client is ready');
            let room = data.room;
            let token = data.token;
            socket.join(room);
            socket.emit('init-game', {
                room:room
            });

            console.log(`user:${token} is requesting for game start for room${room}`);
            if (games.has(room)) {
                let game = games.get(room)
                UserList.getUserByToken(token).then((user) => {
                    game.addUser(user)
                })
                console.log(`game:${room} already exists!`)
                return
            }

            let game = new Game(room, socket, io)
            UserList.getUserByToken(token).then((user) => {
                game.startLoop()
                game.addUser(user)
                games.set(room, game)
                console.log(`started new game:${room}:by user:${token}`)
            })
        })

        socket.on('start-game', (data) => {
            let room = data.room;

            if(!games.has(room)) {
                socket.emit('error', {
                    status:'not exists!'
                })
                return
            }

            let game = games.get(room)
            game.startGame();
            socket.emit('error', {
                status:'started successfully !',
                code: game.status,
            })
        })

        socket.on('clear-all', () => {
            games.forEach(game => {
                game.stop()
            })

            games.clear();
            redis.flushAll().then(r => {
                console.log('flushed everything');
            })
        })
    }
}

module.exports = {
    handleGames
}
