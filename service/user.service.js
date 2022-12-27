const User = require("../DataBase/User");

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);
    },
    findOneByParams: async (filter = {}) => {
        return User.findOne(filter)
    },
    findByIdWithCars: async (userId) => {
        const res = await User.aggregate([
            {
                $match: {
                    _id: userId
                }
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'cars',
                }
            }
        ]);

        return res[0];
    },
    createUser: async (userInfo) => {
        return User.create(userInfo)
    },
    update: async (userId, newUserInfo) => {
        return User.findByIdAndUpdate(userId, newUserInfo, {new: true})
    },
    delete: async (userId) => {
        return User.deleteOne({_id: userId})
    }
}