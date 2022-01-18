const redis = require('../redis').client

module.exports = {
    handleGetUser(req, res, next) {
        (async () => {
            let token = req.header('X-Game-Token')
            let user = await redis.HGETALL(`user:${token}`)
            user.token = token;
            res.json(user)
        })()
    },

    handleCreateUser(req, res, next) {
        (async () => {
            let token = req.header('X-Game-Token')
            let name = req.body.name;
            console.log(token, name);
            await redis.HSET(`user:${token}`, {
                name: name
            })
            let user = await redis.HGETALL(`user:${token}`)
            console.log(user);
            user.token = token;
            res.json(user)
        })()
    }
}