var mongoose = require('mongoose');

module.exports = mongoose.model('SwitchInfo', {
    associateid: {
        type: String,
        default: ''
    },
    direction: {
        type: String,
        default: ''
    },
    tstamp: {
        type: Date,
        default: ''
    }
});