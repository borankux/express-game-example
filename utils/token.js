const uuid = require('uuid')

module.exports = {
    generateToken: function() {
        return uuid.v1()
    }
}
