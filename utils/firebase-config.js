
var admin = require("firebase-admin");

var serviceAccount = require("./../pushnotification-383104-20ec007a0778.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports.admin = admin