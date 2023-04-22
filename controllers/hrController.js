const Hr = require('../models/hrModel');
const Feedback = require('../models/feedbackModel');
const Employee = require('../models/employeeModel');
const path = require('path')
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { uploadImage } = require('../utils/uploadImage');
const { getToken } = require('../utils/getToken');

const signup = async (req, res, next) => {
    const { first_name, last_name, email, fcm, image, working_at } = req.body;

    const imagePath = path.join(__dirname, `../uploaded-images/${req.files[0].fieldname}-${req.files[0].originalname}`)
    const data = await uploadImage(imagePath);

    const hr = new Hr({
        first_name: first_name,
        last_name: last_name,
        email: email,
        fcm: fcm,
        image: data.url,
        working_at: working_at
    });

    await hr.save();

    const finalResponse = {
        hr: hr
    }
    return sendSuccess(res, 200, "Signup Successfully", finalResponse);
};

const feedback = async (req, res, next) => {
    const { employee_id, flag, hr_id, review, rating } = req.body;

    const feedback = new Feedback({
        hr_id: hr_id,
        employee_id: employee_id,
        flag: flag,
        review: review,
        rating: rating,
    });


    let employee = await Employee.findByIdAndUpdate(
        { _id: employee_id },
        {
            "flag": flag,
            $push: { "feedback": feedback._id }
        },
        { new: true, runValidators: true }
    );

    // Send Notification From Here


    await feedback.save();

    const finalRespnse = {
        employee: employee,
        feedback: feedback
    }

    return sendSuccess(res, 200, `Employee Marked With The ${flag}`, finalRespnse);
}



const signin = async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    const hr = await Hr.find({
        "email": email
    });
    const finalRespnse = {
        hr: hr[0]
    }
    return sendSuccess(res, 200, 'Login Successfully', hr);
};
module.exports = { signup, feedback, signin };