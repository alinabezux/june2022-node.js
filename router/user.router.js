const router = require('express').Router();
const controller = require('../controller/user.controller')
const middleware = require('../middleware/user.middleware')

router.get('/', controller.getAllUsers);
router.post('/', middleware.isNewUserValid, middleware.checkIsEmailUnique, controller.createUser);

router.get(
    '/:userId',
    middleware.isUserIdValid,
    middleware.getUserDynamically('userId', 'params', '_id'),
    controller.getUserById);
router.put(
    '/:userId',
    middleware.isUserIdValid,
    middleware.isUpdateUserValid,
    middleware.getUserDynamically('userId', 'params', '_id'),
    controller.updateUser);
router.delete('/:userId', middleware.isUserIdValid, controller.deleteUser);

module.exports = router;