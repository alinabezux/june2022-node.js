const userDB = require('../DataBase/users.json')
const ApiError = require('/error/ApiError')

module.exports = {
    checkIsUserExists: (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = userDB[userId];

            if (!user) {
                throw new ApiError('User is not found :(', 404)
            }

            req.user = user;

            next();
        } catch (e) {
            next(e)
        }
    }
}