const router = require('express').Router();

const controller = require('../controller/auth.controller');
const mdlwr = require('../middleware/auth.middleware');
const userMdlwr = require('../middleware/user.middleware');

router.post('/login', mdlwr.isBodyValid, userMdlwr.getUserDynamically('email'), controller.login);

router.post('/refresh', mdlwr.checkRefreshToken, controller.refresh);

router.post('/logout',mdlwr.checkAccessToken,controller.logout);

router.post('/logoutAll',mdlwr.checkAccessToken,controller.logoutAll);


module.exports = router;
