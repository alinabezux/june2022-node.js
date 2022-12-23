const Joi = require('joi');
const regexp = require('../configs/regexp');

module.exports = {
    idValidator: Joi.string().regex(regexp.MONGO_ID)
}