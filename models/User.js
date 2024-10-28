const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');


const UserSchema = mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true
    },
    userRole: {
        type: String,
        require: true, //admin, employee
    },
    encryPassword: {
        type: String,
        require: true
    },
    salt: String,
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);


UserSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encryPassword = this.securePassword(password);
  })
  .get(function () {
    var x = this._password;
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainpassword) {
    var x = this.securePassword(plainpassword) === this.encryPassword;
    return this.securePassword(plainpassword) === this.encryPassword;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

const User = mongoose.model("user", UserSchema);
module.exports = User;