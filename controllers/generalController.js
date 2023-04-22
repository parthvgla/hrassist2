const { sendSuccess } = require('../utils/apiResponse');
const { admin } = require('./../utils/firebase-config');
var fcm = require('fcm-notification');
var serviceAccount = require("../pushnotification-383104-20ec007a0778.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

const sendToDevice = (token, Message, notificationOptions) => {

    return new Promise(resolve => {
        admin
            .messaging()
            .sendToTopic(token, Message, notificationOptions)
            .then(response => {
                console.log(response);
                if (response.failureCount) {
                    resolve('failure');
                } else {
                    resolve('success');
                }
            })
            .catch(() => {
                resolve('failure');
            });
    });
}

const sendNotification = async (req, res) => {
    // const { message } = req.body;

    // const { token, notification, data } = message;

    // const { title, body } = notification;

    // console.log(title);

    // console.log(body);

    // const Message = {
    //     data,
    //     notification
    // }

    // console.log(Message)

    // const notificationOptions = {
    //     priority: 'high',
    //     timeToLive: 60
    // };

    // const status = await sendToDevice(token, Message, notificationOptions);

    // return sendSuccess(res, 200, 'Success', status);
    const { token } = req.body.message;
    const message = {
        notification: {
            title: "New message",
            body: "You have a new message from John"
        },
        token: token
    };

    admin.messaging().send(message)
        .then((response) => {
            console.log("Successfully sent message:", response);
        })
        .catch((error) => {
            console.log("Error sending message:", error);
        });

    return sendSuccess(res, 200, 'Send Successfully', true);
};

module.exports = { sendNotification }