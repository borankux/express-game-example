const {User, UserList}  = require('../models/user')

let ul = new Set()

let user1 = new User('token1', 'Frank')
user1.ids.add('user1:id1')
user1.ids.add('user1:id2')
user1.ids.add('user1:id3')
user1.ids.add('user1:id4')
ul.add(user1)

let user2 = new User('token2', 'Mukaram')
user2.ids.add('user2:id1')
user2.ids.add('user2:id2')
user2.ids.add('user2:id3')
user2.ids.add('user2:id4')
user2.ids.add('user2:id5')
ul.add(user2)

let id = 'user2:id5'

let token = UserList.getTokenById(ul, id)
console.log(token);