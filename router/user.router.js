const router = require('express').Router();
const controller = require('../controller/user.controller')
const middleware = require('../middleware/user.middleware')

router.get(
    '/',
    controller.getAllUsers
);

router.post(
    '/',
    middleware.checkIsBodyValidCreate,
    controller.createUser
);

router.get(
    '/:userId',
    middleware.checkIsIdValid,
    middleware.checkIsUserExists,
    controller.getUserById
);

router.put(
    '/:userId',
    middleware.checkIsIdValid,
    middleware.checkIsUserExists,
    middleware.checkIsBodyValidUpdate,
    controller.updateUser
);

router.delete(
    '/:userId',
    middleware.checkIsIdValid,
    middleware.checkIsUserExists,
    controller.deleteUser
);

module.exports = router;