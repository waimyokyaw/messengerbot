const API_AI_TOKEN = '15723f7aec1f40dc816c767bcfb72980';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAowv3L9F9EBAAAKoQ9RA6gvOcmvNglXsDIiqcSEGtVRqaR0iDypJaVI2ZBUciO1ZCK79h0liqWv2XDUJbjslJZCL9VZCybVUI5jZAuZBZAtu8czel3DToip7PtrCOaIETWYZAd6BkKsCLSPbSfSEjArev7idrgOjTZAaQWve3ZCX6GAZDZD';
const request = require('request');

const sendTextMessage = (senderId, text) => {

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'waimyobot' });
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};
