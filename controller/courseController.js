const Course = require('../model/Course');

const addCourse = async (req, res) => {
    try {
        const { title, description, teacher, lessons, students, rating, price, imageUrl, category } = req.body;

        // Logging the request body to check if all fields are present
        console.log("Request Body: ", req.body);

        // Validate the request body
        if (!title || !description || !teacher || !lessons || !students || !rating || !price || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new course
        const course = new Course({ title, description, teacher, lessons, students, rating, price, imageUrl, category });
        await course.save();

        res.status(201).render('pages/index');
    } catch (error) {
        console.error("Error adding course: ", error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error("Error deleting course: ", error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addCourse, deleteCourse };
