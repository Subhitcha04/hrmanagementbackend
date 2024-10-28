const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator")

const ResourcesSchema = mongoose.Schema({
    
    Email: {
        type: String,
        require: true
    },
    ResourcesType: {
        type: String,
        require: true,
    },
    ResourcesName: {
        type: String,
        require: true,
    },
    Description: {
        type: String,
        require: true,
    },
    IssuedDate: {
        type: String,
        require: true, 
    },
    Status: {
        type: String,
        require: true // actived, revoked, Assinged, returned, 
    }
});

// LeaveWFHSchema.plugin(uniqueValidator)

const Resources = mongoose.model("Resource", ResourcesSchema);
module.exports = Resources;