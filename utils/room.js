module.exports = {
    generateRoomID:function* () {
        let id = 10001
        while (true) {
            yield id++
        }
    }
}