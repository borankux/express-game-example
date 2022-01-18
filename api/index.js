const {handleCreateUser} = require("./user");
const {handleGetUser} = require("./user");
const {handleCheckRoom} = require("./room");
const {handleCreateRoom} = require("./room");
const {handleAuth} = require("./auth");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const initAPI = (app) => {
    app.get( '/api/auth',  handleAuth)
    app.post('/api/room',  handleCreateRoom)
    app.get( '/api/room',  handleCheckRoom)
    app.get( '/api/user',  handleGetUser)
    app.post( '/api/user', jsonParser, handleCreateUser)
}

module.exports = {
    initAPI
}
