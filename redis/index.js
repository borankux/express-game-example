const {createClient} = require('redis')
const {options} = require('./config')
const client = createClient(options)
client.connect()

module.exports = {
    client
}