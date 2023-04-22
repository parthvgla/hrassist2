const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    aadhar_no: {
        type: String,
    },
    first_name: {
        type: String,
        required: ['true', 'Please enter the first name ']
    },
    last_name: {
        type: String,
        required: ['true', 'Please enter the last name']
    },
    address: {
        type: String,
        default: ""
    },
    working_status: {
        type: String,
        default: ""
    },
    aadhar: {
        type: String,
        default: ""
    },
    pancard: {
        type: String,
        default: ""
    },
    flag: {
        type: String,
        enum: ['0', '1', '2', '3'],
        default: '0'
    },
    past_employers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hr'
        }
    ],
    feedback: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ],
    rating: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating'
        }
    ],
    image: {
        type: String,
        default: ""
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    working_at: {
        type: String,
        default: "Mumbai"
    }
}, { timestamps: true })

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;