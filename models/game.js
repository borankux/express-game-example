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

    shout(event, data) {
        this.socket.broadcast.to(this.room).emit(event, data)
    }

    startLoop() {
        if (this.status !== this.GAME_DEFAULT) {
            return false
        }
        this.loop = setInterval(()=>{
            if(this.status !== this.GAME_PAUSED) {
                let time = moment().toISOString()
                console.log(`updating for room:${this.room}`);
                this.shout('update', {
                    time: time,
                    users: Array.from(this.users),
                    game: {
                        status: this.status
                    }
                })
            }
        }, this.GAME_TICK)
        return true;
    }

    startGame() {
        if (this.status === this.GAME_PAUSED || this.GAME_READY) {
            this.status = this.GAME_RUNNING;
            this.shout('game-started', {
                game: this.status
            })
        }
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

    addUser(user) {
        let added = false;
        this.users.forEach(item => {
            if (item.token === user.token) {
                console.log('user exists:' + user.name)
                added = true
                return false
            }
        })

        if (added) {
            return false
        }

        this.users.add(user)
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