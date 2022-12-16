const router = require('express').Router();
const {userController} = require('../controller')
const middleware = require('../middleware/user.middleware')

router.get('/', userController.getAllUsers);
router.post('/', middleware.checkIsBodyValidCreate, middleware.userNormalizator, middleware.checkIsEmailUnique, userController.createUser);

router.get('/:userId', middleware.checkIsUserExists, userController.getUserById);
router.put('/:userId', middleware.checkIsBodyValidUpdate, middleware.userNormalizator, middleware.checkIsUserExists, userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;