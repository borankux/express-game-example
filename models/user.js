class User {
    constructor(token, name) {
        this.token = token;
        this.name = name;
        this.ids = new Set()
    }

    addIds(id) {
        this.ids.add(id)
    }

    removeIds(id) {
        this.ids.delete(id)
    }

    hasId(id) {
        return this.ids.has(id)
    }
}

class UserList {
    /**
     * @param users {Set<User>}
     * @param id {String}
     * @return string|null
     */
    static getTokenById(users, id) {
        let token = null
        users.forEach(user => {
            if (user.ids.has(id)) {
                token = user.token
            }
        })
        return token
    }
}


module.exports = {
    User,
    UserList
}