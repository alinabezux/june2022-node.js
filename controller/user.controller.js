const {userService} = require('../service');
const User = require("../DataBase/User");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findByParams();

            res.json(users);
        } catch (e) {
            next(e)
        }
    },
    getUserByIdWithCar: async (req, res, next) => {
        try {
            const user = await userService.findByIdWithCars(req.params._id);

            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            let userInfo = req.body;

            const user = await userService.createUser(userInfo);
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
            const userId = req.params.userId;
            await userService.delete(userId);

            res.status(204).json('Deleted.')
        } catch (e) {
            next(e)
        }
    }
}