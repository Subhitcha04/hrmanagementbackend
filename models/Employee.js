const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const EmployeeSchema = mongoose.Schema({
    Email: {
        type: String,
        require: true,
        unique: true,
    },
    FirstName: {
        type: String,
        require: true,
    },
    LastName: {
        type: String,
        require: true,
    },
    PhoneNumber: {
        type: String,
        require: true,
    },
    Address: {
        type: String,
        require: true,
    },
    Designation: {
        type: String,
        require: true,
    },
    EmpStartDate: {
        type: String,
        require: true,
    },
    BasicSalary: {
        type: Number,
        require: true
    },
    LossAmountPerLeave: {
        type: Number,
        default: 500
    },
    SalaryForMonth: [
        {
            Month: {
                type: String,
            },
            PaidDate: {
                type: String,
            },
            Additions: {
                Reason: {
                    type: String,
                },
                Amount: {
                    type: Number,
                    default: 0
                }
            },
            Deductions: {
                Reason: {
                    type: String,
                },
                Amount: {
                    type: Number,
                    default: 0
                }
            },
            NetSalary: {
                type: Number,
            },
    
        }
    ],
    
    BankDetails: {
        AccountNumber: {
            type: String,
        },
        BankName: {
            type: String
        },
        AccHolderName: {
            type: String
        },
        BranchName: {
            type: String
        }
    },
    DeleteFlag: {
        type: Boolean,
        require: true,
    },
});

EmployeeSchema.plugin(uniqueValidator)

const Employee = mongoose.model("employees", EmployeeSchema);
module.exports = Employee;