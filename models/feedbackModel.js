const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    hr_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hr'
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    review: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0
    },
    flag: {
        type: String,
        default: "0"
    }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;