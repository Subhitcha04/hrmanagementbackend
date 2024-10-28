const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator")

const LeaveWFHSchema = mongoose.Schema({
    
    Email: {
        type: String,
        require: true,
    },
    RequestDate: {
        type: String,
        require: true,
    },
    Month: {
        type: String,
        require: true,
    },
    Reason: {
        type: String,
        require: true,
    },
    Status: {
        type: String,
        require: true, // pending, aproved, rejected, canceld
        default: 'Pending'
    },
    ReqType: {
        type: String,
        require: true // leave or wfh
    }
});

// LeaveWFHSchema.plugin(uniqueValidator)

const LeaveWFH = mongoose.model("leavewfh", LeaveWFHSchema);
module.exports = LeaveWFH;