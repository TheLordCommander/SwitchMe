var mongoose = require('mongoose');

module.exports = mongoose.model('UserData', {
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    associateid: {
        type: Number,
        default: ''
    }
});