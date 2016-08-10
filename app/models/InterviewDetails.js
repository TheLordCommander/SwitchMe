var mongoose = require('mongoose');
module.exports = mongoose.model('InterviewDetails', {
    group: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    dateOf: {
        type: Date
    }
});