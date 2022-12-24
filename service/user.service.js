const User = require('../DataBase/User');

module.exports = {
    findByParams: (filter = {}) => {
        return User.find(filter);
    },
    findOneByParams: (filter = {}) => {
        return User.findOne(filter)
    },
    findByIdWithCars: async (userId) => {
        const res = await User.aggregate([
            {
                $match: {_id: userId}
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'cars'
                }
            }
        ]);

        return res[0];
    },
    createUser: async (userInfo) => {
        return User.create(userInfo)
    },
    update: (userId, newUserInfo) => {
        return User.findByIdAndUpdate(userId, newUserInfo, {new: true})
    },
    delete: (userId) => {
        return User.deleteOne({_id: userId})
    }
}