const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        required: true
    },
    receiverEmail: {
        type: [String],
        required: true
    },
    subjectEmail: {
        type: String,
        required: true
    },
    bodyEmail: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// Create a model
const EmailModel = mongoose.model('Email', emailSchema);
module.exports = EmailModel
