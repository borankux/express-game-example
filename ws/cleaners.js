const { Server } = require('socket.io')
const CLEANER_TICK = 3000

/**
 *
 * @param io{Server}
 */
function initCleaners(io) {
    setInterval(() => {
        console.log(io._nsps.get('/game').adapter.rooms);
    }, CLEANER_TICK)
}

module.exports = {
    initCleaners
}