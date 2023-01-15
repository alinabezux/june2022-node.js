const oauthService = require("../service/oauth.service");
const emailService = require('../service/email.service');
const OAuth = require("../dataBase/OAuth");
const {WELCOME, FORGOT_PASSWORD} = require("../email-templates/email-actions.enum");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('alinabezux@gmail.com', WELCOME, {userName: user.name})

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id})

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo;
            await OAuth.deleteOne({refreshToken});

            const tokenPair = oauthService.generateAccessTokenPair({id: _user_id});

            await OAuth.create({...tokenPair, _user_id})

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.tokenInfo;

            await OAuth.deleteOne({accessToken});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo;

            await OAuth.deleteMany({_user_id});

            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    }

}
