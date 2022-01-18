const {generateToken} = require("../utils/token");
module.exports = {
    handleAuth(req, res, next) {
        let token = req.query.token;
        if(!token || token === "undefined" || token ==="null") {
            //refreshing token
            token = generateToken()
        }

        res.json({
            token: token
        })
    }
}
