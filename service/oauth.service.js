const bcrypt = require('bcrypt');
const ApiError = require("../error/ApiError");
const jwt = require('jsonwebtoken')

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordSame) {
            throw new ApiError('Wrong email or password.', 400);
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, 'secretWord', {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, 'secretRefreshWord', {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }
}