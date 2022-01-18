const moment = require("moment");


class Game {
    GAME_DEFAULT = 0
    GAME_READY  = 1
    GAME_RUNNING = 2
    GAME_PAUSED = 3
    GAME_ENDED = 4
    GAME_TICK = 1000

    constructor(room, socket) {
        this.status = this.GAME_DEFAULT
        this.room = room
        this.socket = socket
        this.users = new Set()
    }

    start() {
        if (this.status !== this.GAME_DEFAULT) {
            return false
        }
        this.loop = setInterval(()=>{
            if(this.status !== this.GAME_PAUSED) {
                let time = moment().toISOString()
                console.log(`updating for room:${this.room}`);
                this.socket.broadcast.to(this.room).emit('update', {
                    time: time,
                    users: Array.from(this.users)
                })
            }
        }, this.GAME_TICK)
        this.status = this.GAME_RUNNING
        return true;
    }

    resume() {
        if(this.status !== this.GAME_PAUSED) {
            return false
        }
        this.status = this.GAME_PAUSED;
        return true;
    }

    stop() {

        if(this.status !== this.GAME_PAUSED || this.status !== this.GAME_RUNNING) {
            return false
        }

        clearInterval(this.loop)
        this.status = this.GAME_ENDED
        return true
    }

    pause() {
        if (this.status !== this.GAME_RUNNING) {
            return false
        }
        this.status = this.GAME_PAUSED;
        return true;
    }

    addUser(token) {
        if (this.users.has(token)) {
            return false
        }
        this.users.add(token)
        return true
    }

    removeUser(token) {
        if (!this.users.has(token)) {
            return false
        }
        this.users.delete(token)
        return true
    }
}

module.exports = {
    Game
}