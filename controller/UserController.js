const bcryptjs = require('bcryptjs');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

// Function to render signup page
async function signupPage(req, res) {
    try {
        res.render('pages/register');
    } catch (error) {
        console.error(error);
        res.status(500).redirect('back');
    }
}

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.redirect('back');
        }
        const _SALT_ROUND = 10;
        const hashedPassword = await bcryptjs.hash(password, _SALT_ROUND);
        const data = await userModel.create({ name, email, password: hashedPassword });
        console.log('User signup');
        res.status(201).redirect(`/user/login`);
    } catch (error) {
        console.error(error);
        res.status(500).redirect('back');
    }
}

async function loginPage(req, res) {
    try {
        res.render('pages/login');
    } catch (error) {
        console.error(error);
        res.status(500).redirect('back');
    }
}

// Function to handle user login
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.redirect('back');
        }
        const isVerify = await bcryptjs.compare(password, user.password);
        if (!isVerify) {
            return res.redirect('back');
        }
        const payload = {
            sub: user._id,
            name: user.name
        };
        const token = jwt.sign(payload, 'secret', {
            expiresIn: '1d'
        });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('back');
    }
}

// Function to handle user logout
async function logout(req, res) {
    try {
        res.clearCookie('token');
        res.redirect('/user/login');
    } catch (error) {
        console.error(error);
        res.redirect('back');
    }
}

// Exporting all the functions
module.exports = {
    signupPage,
    signup,
    loginPage,
    login,
    logout
};
