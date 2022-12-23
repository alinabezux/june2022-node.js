const oauthService = require('../service/oauth.service');
const O_Auth = require('../DataBase/OAuth');

module.exports = {
    login: async (res, req, next) => {
        try {
            const {user, body} = req;

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

            await O_Auth.create({...tokenPair, _user_id: user._id})

            res.json({
                    user,
                    ...tokenPair
            })
        } catch (e) {
            next(e)
        }
    }
}