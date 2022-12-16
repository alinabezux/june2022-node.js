const {userService} = require('../service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.find({})

            res.json(users);
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            let userInfo = req.body;

            const user = await userService.create(userInfo)

            res.status(201).json(user)
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

            const user = await userService.update(userId, newUserInfo);

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            await userService.delete(userId);

            res.status(204).json('Deleted.')
        } catch (e) {
            next(e)
        }
    }
}