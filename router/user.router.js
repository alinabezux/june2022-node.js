const router = require('express').Router();
const middleware = require('../middleware/user.middleware')
const {userController} = require('../controller')

router.get('/', userController.getAllUsers);

router.post('/',
    middleware.checkIsBodyValidCreate,
    middleware.userNormalizator,
    middleware.checkIsEmailUnique,
    userController.createUser);

router.get('/:userId',
    middleware.checkIsUserExists,
    userController.getUserByIdWithCars);

router.put('/:userId',
    middleware.checkIsBodyValidUpdate,
    middleware.userNormalizator,
    middleware.checkIsUserExists,
    userController.updateUser);

router.delete('/:userId',
    userController.deleteUser);

module.exports = router;