const fileServices = require('../services/file.services')

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await fileServices.reader();

            res.json(users)
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const userInfo = req.body;
            const users = await fileServices.reader();

            const newUser = {
                id: users[users.length - 1].id + 1,
                name: userInfo.name,
                age: userInfo.age
            }
            users.push(newUser);
            await fileServices.writer(users);

            res.status(201).json(newUser)
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
            const {user, users, body} = req;

            const index = users.findIndex((u) => u.id === user.id);
            users[index] = {...users[index], ...body};

            await fileServices.writer(users);
            res.status(201).json(users[index])
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {user,users} = req;
            const index = users.findIndex((u) => u.id === user.id);
            users.splice(index,1);

            await fileServices.writer(users);
            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    }
}