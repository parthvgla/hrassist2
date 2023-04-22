// const User = require("../models/userModel");
const decodeToken = require("../utils/decodeToken");

const globalAccess = async (req, res, next) => {
    // const token = req.headers.authorization.split(' ')[1];
    // const decode = decodeToken(token);
    // const { _id, email, phone } = decode;
    // const user = await User.findById(_id);
    // req.user = user;
    // next();
};
module.exports = globalAccess;