const router = require('express').Router();
const controller = require('../controller/user.controller')
const mdlwr = require("../middleware/user.middleware");

router.get('/', controller.getAllUsers)

router.get('/:userId', mdlwr.checkIsUserExists.controller.getUserById)

router.put('/:userId', mdlwr.checkIsUserExists.controller.updateUser)

module.exports = router;