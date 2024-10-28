const express = require("express");
const { signup, signin, signout, isSignedIn, isAdmin, verifyToken } = require("../controllers/userController");
const route = express.Router();

module.exports = route;

route.post('/auth/signup', signup);
route.post('/auth/signin', signin);
route.post('/auth/signout', signout);
route.get('/auth/verifyToken', verifyToken);
route.get('/auth/isAdmin', isAdmin);


// const {
//     isSignedIn,
//     isAuthenticated,
//     isAdmin,
//     apiAuth,
//   } =  require("");