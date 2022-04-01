const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
    guardian_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    guardian_phone: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Guardian', guardianSchema);