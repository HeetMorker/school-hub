const express = require('express');
const {signupPage,signup,loginPage,login,logout} = require('../controller/UserController');
const router = express.Router();
const userModel = require('../model/userModel');

// const userController = new UserController()

router.get('/register', signupPage)
router.post('/register', signup)

router.get('/login', loginPage)
router.post('/login', login)

router.get('/logout', logout)

module.exports = router