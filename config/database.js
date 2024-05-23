
const mongoose = require('mongoose');
const db = async () => {
    await mongoose.connect("mongodb+srv://heet:1234@cluster0.mx1yxqq.mongodb.net/");
    console.log("database connected.");
}

module.exports = db;
