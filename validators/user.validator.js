const Joi = require('joi');
const regexp = require('../configs/regexp')

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(50).required().default(''),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().required(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
        age: Joi.number().integer().min(1).max(120)
    }),
    updateUserValidator: Joi.object({
        name: Joi.string().min(2).max(50).default('').optional(),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().optional(),
        age: Joi.number().integer().min(1).max(120).optional()
    })
}