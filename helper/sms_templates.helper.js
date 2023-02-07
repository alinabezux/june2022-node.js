const {smsActionTYpeEnum} = require("../enum");

module.exports = {
    [smsActionTYpeEnum.WELCOME]: (name) => {
        return `Hi, ${name}, welcome to our platform!`
    },
    [smsActionTYpeEnum.FORGOT_PASSWORD]: (name) => {
        return `Hi, ${name}, looks like you forgot your password. Don't worry,you can change it.`
    }
}