const ApiError = require("../error/ApiError");
const userService = require("../service/user.service");
const {userNormalizator} = require("../helper");

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOneByParams({_id: userId})

            if (!user) {
                throw new ApiError('user is not exist', 404)
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsBodyValidCreate: (req, res, next) => {
        try {
            const {name, email, age} = req.body;

            if (!name || name.length < 3 || typeof name !== "string") {
                throw new ApiError('Wrong name', 400)
            }
            if (!email || !email.includes('@')) {
                throw new ApiError('Wrong name', 400)
            }
            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Wrong name', 400)
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsBodyValidUpdate: async (req, res, next) => {
        try {
            const {name, email, age} = req.body;

            if (name && (name.length < 3 || typeof name !== "string")) {
                throw new ApiError('Wrong name', 400)
            }
            if (email && !email.includes('@')) {
                throw new ApiError('Wrong name', 400)
            }
            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new ApiError('Wrong name', 400)
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ApiError('Email not exist.', 400)
            }

            const user = await userService.findOneByParams({email});
            if (user) {
                throw new ApiError('User with this email already exists.', 409)
            }

            next();
        } catch (e) {
            next(e)
        }
    },
    userNormalizator: (req, res, next) => {
        try {
            const {name, email} = req.body;

            if (name) req.body.name = userNormalizator.name(name);
            if (email) req.body.email = email.toLowerCase();

            next();
        } catch (e) {
            next(e);
        }
    }
}