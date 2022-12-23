const authValidator = require("../validators/auth.validator");
const ApiError = require("../error/ApiError");

module.exports = {
    isBodyValid: async (res, req, next) => {
        try {
            const loginInfo = req.body;

            const validate = authValidator.loginValidator.validate(loginInfo);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}