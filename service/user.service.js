const User = require('../DataBase/User');

module.exports = {
    find: (filter) => {
        return User.find(filter);
    },
    findOne: (filter) => {
        return User.findOne(filter)
    },
    update: (userId, newUserInfo) => {
        return User.findByIdAndUpdate(userId, newUserInfo, {new: true})
    },
    create: (userInfo) => {
        return User.create(userInfo)
    },
    delete: (userId) => {
        return User.deleteOne({_id: userId})
    }
}