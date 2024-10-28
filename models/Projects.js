const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator")

const ProjectsSchema = mongoose.Schema({
    
    Email: {
        type: String,
        require: true
    },
    ManagerName: {
        type: String,
        require: true,
    },
    ProjectName: {
        type: String,
        require: true,
    },
    ProjectDuration: {
        type: String,
        require: true,
    },
    StartDate: {
        type: String,
        require: true, 
    },
    EndDate: {
        type: String,
        require: true, 
    },
    Feedback: {
        type: String,
        require: true, 
        default: 'No Comments'
    },
    Status: {
        type: String,
        require: true // ongoing, completed, onhold
    }
});

// LeaveWFHSchema.plugin(uniqueValidator)

const Projects = mongoose.model("project", ProjectsSchema);
module.exports = Projects;