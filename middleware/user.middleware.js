const ApiError = require("../error/ApiError");
const User = require('../DataBase/User')

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await User.findById(userId)

            if (!user) {
                throw new ApiError('user is not exist', 404)
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsEmailUnique: async (req, res, next) => {
        try {
            let {email} = req.body;

            if (!email) {
                throw new ApiError('Email not exist.', 400)
            }

            let user = await User.findOne({email});
            if (user) {
                throw new ApiError('User with tis email already exists.', 409)
            }

            next();
        } catch (e) {
            next(e)
        }
    }
}