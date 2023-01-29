const removeOldTokens = require('./removeOldTokens');
const removeOldPasswords = require('./removeOldPassword');

const cronRunner = () => {
    removeOldTokens.start();
    removeOldPasswords.start();
};

module.exports = {
    cronRunner,
}