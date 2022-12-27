const {userService} = require('../service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findByParams();

            res.json(users);
        } catch (e) {
            next(e)
        }
    },
    getUserByIdWithCars: async (req, res, next) => {
        try {
            const user = await userService.findByIdWithCars(req.user._id);

            res.json(user);
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user)
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
            await userService.delete(req.params.userId);

            res.status(204).json('Deleted.')
        } catch (e) {
            next(e);
        }
    }
}