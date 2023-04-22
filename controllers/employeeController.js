const Employee = require('../models/employeeModel');
const Feedback = require('../models/feedbackModel')
const Admin = require('../models/adminModel');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
const Formdata = require('form-data');
const axios = require('axios');
const path = require('path')
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { uploadImage } = require('../utils/uploadImage');
const { getToken } = require('../utils/getToken');

const verify = async (req, res, next) => {

    var matched = true;

    var message;

    console.log('hii');

    const { first_name, last_name, address, working_status, working_at } = req.body;

    const imagePath1 = path.join(__dirname, `../uploaded-images/aadhar-${req.files[0].originalname}`);
    const imagePath2 = path.join(__dirname, `../uploaded-images/pancard-${req.files[1].originalname}`);
    const imagePath3 = path.join(__dirname, `../uploaded-images/person-${req.files[2].originalname}`);

    const url1 = await uploadImage(imagePath1);
    const url2 = await uploadImage(imagePath2);
    const url3 = await uploadImage(imagePath3);

    let form_data = new Formdata();

    const uniqueId = Math.floor((Math.random() * 1000000) + 1);

    let aadhar_no;

    try {
        const form = new Formdata();
        form.append('files', fs.readFileSync(path.join(__dirname, `../uploaded-images/aadhar-${req.files[0].originalname}`)), path.join(__dirname, `../uploaded-images/aadhar-${req.files[0].originalname}`));

        const response = await axios.post(
            'https://nationalapi.docsumo.com/api/v1/national/extract/',
            form,
            {
                params: {
                    'side': 'front',
                    'save_data': 'false',
                    'return_redacted': 'false',
                    'fraud_check': 'true'
                },
                headers: {
                    ...form.getHeaders(),
                    'X-API-KEY': '8A9bHKifEJLjZgKt7j4uJElzofocYNeNdYEl93wBsGHS2IhNXbd6ZDKuwkAI'
                }
            }
        );

        if (response) {
            aadhar_no = response?.data?.data?.no?.value;
        }

    } catch (error) {
        console.log(error);
    }

    form_data.append('aadhar', url1.url);
    form_data.append('pancard', url2.url);
    form_data.append('photo', url3.url);
    form_data.append('id', aadhar_no);

    try {
        const response = await axios.post('http://192.168.110.54:5000/upload', form_data);
        if (String(response?.data) === "__Different" || String(response?.data) === "__NoPerson") {
            message = String(response?.data);
            matched = false;
        }
        if (String(response?.data) === "__FSuccessful") {
            message = String(response?.data);
        }
    } catch (error) {
        console.log(error);
    }


    if (matched) {
        const employee = new Employee({
            aadhar_no: aadhar_no,
            first_name: first_name,
            last_name: last_name,
            address: address,
            working_status: working_status,
            aadhar: url1.url,
            pancard: url2.url,
            image: url3.url,
            is_verified: true
        });
        await employee.save();
        const finalResponse = {
            employee: employee
        }
        if (message === "__FSuccessful")
            return sendSuccess(res, 200, "Verified Successfull & Added To The Database", finalResponse);
        else
            return sendSuccess(res, 200, "Verified Successfully & User Already Exist", finalResponse)
    }
    else {
        const employee = new Employee({
            aadhar_no: aadhar_no,
            first_name: first_name,
            last_name: last_name,
            address: address,
            working_status: working_status,
            aadhar: url1.url,
            pancard: url2.url,
            image: url3.url,
            is_verified: false
        });
        await employee.save();
        const admin = await Admin.findByIdAndUpdate(
            { _id: "6431672a5d04f400022772b4" },
            { $push: { "unverified_user": employee._id } },
            { new: true, runValidators: true }
        );
        const finalRespnse = {
            employee: employee,
            admin: admin
        }
        if (message === "__Different")
            return sendSuccess(res, 201, 'People in images are not same', finalRespnse);
        else
            return sendSuccess(res, 201, 'No Person Found', finalRespnse);
    }

};

const allEmployee = async (req, res) => {
    const data = await Employee.find({
        "is_verified": true
    });
    const finalRespnse = {
        employee: data
    }
    return sendSuccess(res, 200, 'All Employee', finalRespnse);
};

const employee = async (req, res) => {
    const { employee_id } = req.params;
    const employee_data = await Employee.findById({
        _id: employee_id
    });

    const feedback = await Feedback.find({
        "employee_id": employee_id
    }).populate('hr_id', 'first_name last_name email image');


    const finalRespnse = {
        employee_data: employee_data,
        feedback: feedback
    }
    return sendSuccess(res, 200, 'Employee Data', finalRespnse)
}

const recommendedEmployee = async (req, res, next) => {
    // const recommendedEmployee = await Feedback.find(
    //     { $and: [{ "rating": { $gt: 2 } }, { "is_verified": true }] }
    // ).populate('employee_id', 'first_name last_name image aadhar pancard address');

    const recommendedEmployee = await Feedback.find({
        "rating": { $gt: 2 },

    }).populate('employee_id', 'first_name last_name image aadhar pancard address');

    const finalRespnse = {
        recommendedEmployee: recommendedEmployee
    }

    return sendSuccess(res, 200, 'Recommended Employee', finalRespnse);
}
module.exports = { verify, allEmployee, employee, recommendedEmployee };