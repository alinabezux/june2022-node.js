const twilio = require('twilio');

const {TWILIO_ACCOUNT_SID, TWILIO_SERVICE_SID, TWILIO_AUTH_TOKEN} = require("../config/configs");

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSms = async (message, phone) => {
    try {
        console.log(`SMS start from - ${phone}`)

        const msgResp = await client.messages.create({
            body: message,
            messagingServiceSid: TWILIO_SERVICE_SID,
            to: phone
        })

        console.log(`SMS responce - ${msgResp.status}`)

    } catch (e) {
        console.error(`SMS SERVICE - ${e.message}`)
    }
};

module.exports = {
    sendSms
}