const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    hr_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hr'
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Rating = mongoose.model('Rating', hrSchema);
module.exports = Rating;