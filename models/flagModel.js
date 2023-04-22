const mongoose = require('mongoose');
const flagSchema = new mongoose.Schema({
    hr_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hr'
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    flag: {
        type: String,
        default: ""
    }
})

const Flag = mongoose.model('Flag', flagSchema);
module.exports = Flag;