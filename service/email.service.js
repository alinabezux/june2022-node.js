const nodemailer = require('nodemailer');
const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../config/configs');
const EmailTemplates = require('email-templates');
const emailTemplates = require('../email-templates')
const ApiError = require("../error/ApiError");
const path = require("path");

const sendEmail = async (receiverMail, emailAction, locals = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASSWORD
        }
    });

    const templateInfo = emailTemplates[emailAction]
    if (!templateInfo) {
        throw new ApiError('Wrong template', 500)
    }

    const templateRenderer = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    });

    Object.assign(locals || {}, {frontendURL: 'google.com'});

    const html = await templateRenderer.render(templateInfo.templateName, locals);

    return transporter.sendMail({
        from: 'No reply',
        to: receiverMail,
        subject: templateInfo.subject,
        html
    })

};

module.exports = {
    sendEmail
}