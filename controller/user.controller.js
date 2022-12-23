const User = require('../DataBase/User');
const oauthService = require('../service/oauth.service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await oauthService.hashPassword(req.body.password);

            await User.create({...req.body, password: hashPassword})

            res.json('Created.')
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            res.json(req.user)
        } catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            let newUserInfo = req.body;

            await User.findByIdAndUpdate(userId, newUserInfo);

            res.json('Updated');
        } catch (e) {
            next(e)
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await User.deleteOne({_id: req.params.userId});

            res.status(204).json('Deleted.')
        } catch (e) {
            next(e)
        }
    },


}