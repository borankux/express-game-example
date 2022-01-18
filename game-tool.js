/**
 *
 * @param games {Map}
 * @returns {*}
 */
function getGameRooms(games) {
    let rooms = []
    games.forEach((item, idx, items) => {
        rooms.push(item.room)
    })
    return rooms;
}

module.exports = {
    getGameRooms
}