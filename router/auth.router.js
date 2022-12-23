const router = require('express').Router();

const controller = require('../controller/auth.controller');
const middleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');

router.post('/login', middleware.isBodyValid, userMiddleware.getUserDynamically('email'), controller.login);

module.exports = router;