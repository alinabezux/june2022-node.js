const ApiError = require("../error/ApiError");
const User = require('../DataBase/User')
const userValidator = require('../validators/user.validator');
const commonValidator = require('../validators/common.validator');

module.exports = {
    isUserIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const validate = commonValidator.idValidator.validate(userId);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }
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
                throw new ApiError('User with this email already exists.', 409)
            }

            next();
        } catch (e) {
            next(e)
        }
    },

    isNewUserValid: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const validate = userValidator.newUserValidator.validate(newUserInfo);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateUserValid: async (req, res, next) => {
        try {
            const updateUserInfo = req.body;
            const validate = userValidator.updateUserValidator.validate(updateUserInfo);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (res, req, next) => {
        try {
            const fieldToSearch = req[from][fieldName];
            const user = await User.findOne({[dbField]: fieldToSearch});

            if (!user) {
                throw new ApiError('User not found', 404)
            }

            next();
        } catch (e) {
            next(e);
        }

    }

}