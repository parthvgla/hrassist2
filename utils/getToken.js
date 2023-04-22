const jwt = require('jsonwebtoken');

const getToken = (credential, user) => {
    const payload = {
        _id: user._id,
        email: credential.email,
        phone: credential.phone
    };
    return 'Bearer ' + jwt.sign(payload, process.env.SECRET_KEY);
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}
module.exports = { getToken, verifyToken };