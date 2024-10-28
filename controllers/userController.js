const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');


const EmployeeModel = require('../models/Employee');


exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({message: err})
        }

        return res.status(200).json({ message: 'User added successful!' });
    })
}

exports.signin = (req, res) => {
    const {email, password} = req.body
  
    User.findOne({email}, (err, user) => {
      if(err || !user) {
        return res.status(400).json({
          error: "Email does not exists"
        })
      }
  
      if(!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password does not match"
        })
      }
  
      const x = process.env.SECRET
      // create a token
      const token = jwt.sign({_id: user._id}, process.env.SECRET)
  
      // Put token in cookie
      res.cookie("token", token, { expire: new Date() + 100 })
  
      // Send response to front end
      const { _id, email, userRole } = user
      return res.json({token, user: { _id, email, userRole }})
    })
  }

  exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
      message: "User signout successfull"
    })
  }

  exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).send("Unauthorized request");
    }
    let payload = jwt.verify(token, process.env.SECRET);
    if (!payload) {
      return res.status(401).send("Unauthorized request");
    }
    req.userId = payload._id;
    res.status(200).send("Authorized");
  }

  exports.isAdmin = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    let id = jwt.decode(token, process.env.SECRET)._id
    try {
         User.findById(id, (err, result) => {
            if(result.userRole === 'admin') {
                res.status(200).json({isAdmin: 1});
            } else {
                res.status(200).json({isAdmin: 0});
            }
        });
      } catch (err) {
        console.log(err);
      }
  }

  