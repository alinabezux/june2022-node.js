const userDB = require('../DataBase/users.json')

module.exports = {
    getAllUsers: (req, res, next) => {
        try {
            res.json(userDB);
        } catch (e) {
            next();
        }
    },
    getUserById: (req, res, next) => {
        try {
            res.json(req.user)
        } catch (e) {
            next()
        }
    },
    updateUser: (req, res,next) => {
        try{
        const {userId} = req.params
        userDB[userId] = req.body;

        res.json('Updated')
        }catch (e) {
            next()
        }

    }
}