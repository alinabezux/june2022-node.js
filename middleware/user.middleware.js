const ApiError = require("../error/ApiError");
const fileServices = require('../services/file.services')


module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const {userId} = req.params;
            if (userId < 0 || Number.isNaN(+userId)) {
                throw new ApiError('wrong Id', 400)
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsUserExists: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const users = await fileServices.reader();

            const user = users.find((user) => user.id === +userId);

            if (!user) {
                throw new ApiError('user is not exist', 404)
            }
            req.users = users;
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsBodyValidCreate: (req, res, next) => {
        try {
            const {name, age} = req.body;
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('wrong name', 400)
            }

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('wrong age', 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsBodyValidUpdate: (req, res, next) => {
        try {
            const {name, age} = req.body;
            if (name && (name.length < 2 || typeof name !== 'string')) {
                throw new ApiError('wrong name', 400)
            }

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new ApiError('wrong age', 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    }

}