const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
    guardianName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Guardian', guardianSchema);