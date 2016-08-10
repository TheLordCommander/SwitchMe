var mongoose = require('mongoose');
module.exports = mongoose.model('EmpData', {
    eid: {
        type: Number
    },
    ename: {
        type: String,
        default: ''
    },
    edesg: {
        type: String,
        default: ''
    },
    egroup: {
        type: String,
        default: ''
    }
});