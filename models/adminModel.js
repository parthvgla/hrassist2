const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    unverified_user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        }
    ]

}, { timestamps: true })

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;