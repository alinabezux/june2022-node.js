const router = require('express').Router();
const controller = require('../controller/user.controller')
const {checkIsUserExists} = require("../middleware/user.middleware");

router.get('/', controller.getAllUsers)

router.get('/:userId', checkIsUserExists.controller.getUserById)

router.put('/:userId', checkIsUserExists.controller.updateUser)

module.exports = router;