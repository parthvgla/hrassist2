const Admin = require('../models/adminModel');
const mongoose = require('mongoose')
const path = require('path')
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { uploadImage } = require('../utils/uploadImage');
const { getToken } = require('../utils/getToken');
const Employee = require('../models/employeeModel');

const signup = async (req, res, next) => {
    const { first_name, last_name, email } = req.body;

    const admin = new Admin({
        first_name: first_name,
        last_name: last_name,
        email: email,
    });

    await admin.save();

    const finalResponse = {
        admin: admin
    }
    return sendSuccess(res, 200, "Signup Successfully", finalResponse);
};

const unverifiedUser = async (req, res) => {

    let unverified_users = await Admin.find().select('unverified_user');
    unverified_users = unverified_users[0].unverified_user;

    const data = await Employee.find({ _id: { $in: unverified_users } }).select('aadhar_no first_name last_name address working_status aadhar pancard flag past_employers feedback rating image is_verified working_at');

    const finalRespnse = {
        data: data
    }

    return sendSuccess(res, 200, 'Unverified User', finalRespnse);
}
const varifyEmployee = async (req, res) => {

    const { employee_id } = req.params;

    let data = await Admin.find();

    data = JSON.parse(JSON.stringify(data));

    data = data[0].unverified_user;

    data = data.filter((employeeId) => (String(employeeId) != String(employee_id)));

    const updatedAdmin = await Admin.findByIdAndUpdate(
        { "_id": "6431672a5d04f400022772b4" },
        { "unverified_user": data },
        { new: true, runValidators: true }
    )

    const finalRespnse = {
        updatedAdmin: updatedAdmin
    }
    return sendSuccess(res, 200, 'User Verified Successfully', finalRespnse)
};
module.exports = { signup, unverifiedUser, varifyEmployee };