

const express = require('express');
const router = express.Router();
const { addCourse, deleteCourse } = require('../controller/courseController');
const Course = require('../model/Course');

// Route to render the form to create a course
router.get('/create', (req, res) => {
    res.render('Pages/createCourse');
});
// Route to handle the form submission for creating a course
router.post('/create', addCourse);

// Route to render the list of all courses
router.get('/list', async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('Pages/courses', { courses });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to handle course deletion
router.post('/delete/:id', deleteCourse);

module.exports = router;
