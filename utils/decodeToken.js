const jwt = require('jsonwebtoken');
const decodeToken = (token) => {
    const decode = jwt.decode(token);
    return decode;
};

module.exports = decodeToken;