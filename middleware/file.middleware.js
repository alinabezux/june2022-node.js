const {IMAGE_MAX_SIZE, IMAGE_MIMETYPES} = require("../config/fileUpload.config");
const ApiError = require("../error/ApiError");

module.exports = {
    checkUploadImage: async (req, res, next) => {
        try {
            if (!req.files) {
                throw new ApiError('There is no file to upload.', 400);
            }

            const filesToUpload = Object.values(req.files);

            for (const file of filesToUpload) {
                const {name, size, mimetype} = file;

                if (size > IMAGE_MAX_SIZE) {
                    throw new ApiError(`File ${name} is too big.`, 400)
                }

                if (!IMAGE_MIMETYPES.includes(mimetype)) {
                    throw new ApiError(`File ${name} has invalid format.`, 400);
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}