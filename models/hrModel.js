const mongoose = require('mongoose');

const hrSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: ['true', 'Please enter the first name ']
    },
    last_name: {
        type: String,
        required: ['true', 'Please enter the last name']
    },
    email: {
        type: String,
        default: ""
    },
    fcm: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    working_at: [
        {
            type: String
        }
    ],
    is_verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Hr = mongoose.model('Hr', hrSchema);
module.exports = Hr;